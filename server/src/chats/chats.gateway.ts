import { UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { SocketExtend, Server } from 'socket.io';
import { UserSocketGuard } from '../auth/authSocket.guard';
import { ChatsService } from './chats.service';
import { JoinChatDTO } from './dto/joinChatDTO.dto';
import { Message } from './entities/message.entity';

@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway {
      constructor(private readonly chatsService: ChatsService) {}
      @WebSocketServer()
      server: Server;

      @UseGuards(UserSocketGuard)
      @SubscribeMessage('connection-chat')
      async handleInitChat(@ConnectedSocket() client: SocketExtend, @MessageBody() data: JoinChatDTO): Promise<WsResponse<null>> {
            if (client.user) {
                  const isBelong = this.chatsService.checkBelongChat(client.user.id, data.chatId);
                  if (isBelong) {
                        client.join(data.chatId);
                        // let messages: Message[] = await this.chatsService.loadMessage(data.chatId);
                        // if (messages) this.server.to(data.chatId).emit('load-message-history', { messages: messages });
                        // else this.server.to(data.chatId).emit('load-message-history', { message: [] });
                  }
            }

            return { event: 'connection-chat-success', data: null };
      }
}
