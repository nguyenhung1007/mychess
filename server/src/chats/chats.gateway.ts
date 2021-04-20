import { UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { SocketExtend, Server } from 'socket.io';
import { UserSocketGuard } from 'src/auth/authSocket.guard';
import { ChatsService } from './chats.service';
import { JoinChatDTO } from './dto/joinChatDTO.dto';

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
                  if (isBelong) client.join(data.chatId);
            }

            return { event: 'connection-chat-success', data: null };
      }
}
