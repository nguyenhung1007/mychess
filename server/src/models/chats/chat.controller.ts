import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
      constructor(private readonly chatService: ChatService) {}
}