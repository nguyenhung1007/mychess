import { Injectable } from '@nestjs/common';
import { ChessRepository } from './entity/chess.repository';
import { ChessStatus } from './entity/chess.interface';
import { Chess } from './entity/chess.entity';
import { User } from '../users/entities/user.entity';
import { ChessBoard } from './entity/chessBoard.entity';
import { RedisService } from '../providers/redis/redis.service';

@Injectable()
export class ChessCommonService {
      constructor(private readonly chessRepository: ChessRepository, private readonly redisService: RedisService) {}

      async isPlaying(userId: string) {
            const currentPlay = await this.chessRepository.getManyChessByField('chess.status = :status', {
                  status: ChessStatus.PLAYING,
                  userId,
            });

            return Boolean(currentPlay.length);
      }

      async createNewGame(user: User, isBotMode: boolean) {
            const chess = new Chess();
            chess.users = [user];
            const chessBoard = new ChessBoard(chess, isBotMode);
            await this.setBoard(chessBoard.id, chessBoard);

            return chessBoard;
      }

      async saveChess(chess: Chess) {
            return await this.chessRepository.save(chess);
      }

      async setBoard(boardId: string, board: ChessBoard) {
            await this.redisService.setObjectByKey(`chess-${boardId}`, board, 1440);
      }
}
