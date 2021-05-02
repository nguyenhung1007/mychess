import { UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { SocketExtend, Server } from 'socket.io';
import { ioResponse } from '../app/interface/socketResponse';

//---- Pipe
import { UserSocketGuard } from '../auth/authSocket.guard';
import { SocketJoiValidatorPipe } from '../utils/validator/socketValidator.pipe';

//---- Service
import { RedisService } from '../providers/redis/redis.service';
import { ChatsService } from './chats.service';

//---- DTO
import { JoinChatDTO, vJoinChatDTO } from './dto/joinChatDTO.dto';
import { SendMessageDTO } from './dto/sendMessageDTO';

//---- Entity
import { Message } from './entities/message.entity';

//---- Enum
import { CHATAction } from './chats.action';

@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway {
      constructor(private readonly chatsService: ChatsService, private readonly redisService: RedisService) {}
      @WebSocketServer()
      server: Server;

      /**
       * This function listens on "chat-connection-chat" event from client.
       * After that, checking the user is belong to a chat or not.
       * If yes, then load all the history and send them to client
       * @param data chatId
       */
      @UseGuards(UserSocketGuard)
      @SubscribeMessage(CHATAction.CHAT_CONNECTION_CHAT)
      async handleInitChat(@ConnectedSocket() client: SocketExtend, @MessageBody(new SocketJoiValidatorPipe(vJoinChatDTO)) data: JoinChatDTO) {
            const isBelongTo = await this.chatsService.checkUserBelongToChat(client.user.id, data.chatId);
            if (!isBelongTo) throw ioResponse.sendError({ details: { message: { type: 'user.not-allow-action' } } }, 'BadRequestException');

            await client.join(data.chatId);
            const messages = await this.chatsService.loadMessage(data.chatId);
            this.server.to(data.chatId).emit(CHATAction.CHAT_LOAD_MESSAGE_HISTORY, messages);
            // init a cache to save new message
            await this.redisService.setArrayByKey(`messages-array-${client.user.id}`, []);
            return ioResponse.send(CHATAction.CHAT_CONNECTION_CHAT, {});
      }

      /**
       * This function listens on "chat-send-message" from client.
       * And save this message into database, then send it back to client to display
       * @param data A message from client
       * @returns
       */
      @UseGuards(UserSocketGuard)
      @SubscribeMessage(CHATAction.CHAT_SEND_MESSAGE)
      async sendMessage(@ConnectedSocket() client: SocketExtend, @MessageBody() data: SendMessageDTO) {
            // get messages array from cache
            const messages = await this.redisService.getArrayByKey<Array<Message>>(`messages-array-${client.user.id}`);
            messages.push(data.message);

            await this.redisService.setArrayByKey(`messages-array-${client.user.id}`, messages);
            this.server.to(data.chatId).emit(CHATAction.CHAT_SEND_MESSAGE, data.message);

            return ioResponse.send(CHATAction.CHAT_SEND_MESSAGE, {});
      }

      /**
       * This function listens on "chat-disconnection-chat" from client
       * Load messages in cache and update into database
       * @param data chatId
       * @returns
       */
      @UseGuards(UserSocketGuard)
      @SubscribeMessage(CHATAction.CHAT_DISCONNECTION_CHAT)
      async handleEndChat(@ConnectedSocket() client: SocketExtend) {
            // get messages array from cache
            const messages = await this.redisService.getArrayByKey<Array<Message>>(`messages-array-${client.user.id}`);

            messages.forEach(async (message) => await this.chatsService.saveMessage(message));

            await this.redisService.deleteByKey(`messages-array-${client.user.id}`);
            return ioResponse.send(CHATAction.CHAT_DISCONNECTION_CHAT, {});
      }
}