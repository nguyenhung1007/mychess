import { Injectable } from '@nestjs/common';
import { TicTacToeMovePoint } from './entity/ticTacToe.interface';

import { TicTacToeFlag } from './entity/ticTacToe.interface';

@Injectable()
export class TicTacToeBotService {
      async findBestMove(board: Array<Array<TicTacToeFlag>>, flag: TicTacToeFlag) {
            const length = board.length;
            const testCase: Array<TicTacToeMovePoint> = [];

            for (let i = 0; i < length; i++)
                  for (let j = 0; j < length; j++)
                        if (board[i][j] === -1) {
                              const copyBoard = board.map((arr) => {
                                    return [...arr];
                              });
                              copyBoard[i][j] = flag;
                              const totalTop = this.calTop(copyBoard, this.shirtTop(copyBoard, i, j));
                              const totalBottomLeft = this.calBottomLeft(copyBoard, this.shirtBottomLeft(copyBoard, i, j));
                              const totalTopLeft = this.CalTopLeft(copyBoard, this.shirtTopLeft(copyBoard, i, j));
                              const totalRight = this.calRight(copyBoard, this.shirtRight(copyBoard, i, j));

                              const total = Math.max(totalRight, totalTopLeft, totalBottomLeft, totalTop);
                              if (total) testCase.push({ x: i, y: j, point: total });
                        }
            const max: TicTacToeMovePoint = { point: -Infinity, x: 0, y: 0 };
            for (const item of testCase) {
                  if (item.point === max.point) {
                        if (Math.random() >= 0.5) {
                              max.x = item.x;
                              max.y = item.y;
                        }
                  } else if (item.point > max.point) {
                        max.point = item.point;
                  }
            }
            return max;
      }

      calTop(board: Array<Array<TicTacToeFlag>>, { x, y }: { x: number; y: number }) {
            let newX = x;
            let total = 0;

            while (newX + 1 < board.length && board[newX + 1][y] === board[newX][y]) {
                  newX += 1;
                  total += 10;
            }

            return total;
      }

      shirtTop(board: Array<Array<TicTacToeFlag>>, x: number, y: number) {
            let newX = x;

            while (newX - 1 >= 0 && board[newX - 1][y] === board[newX][y]) {
                  newX -= 1;
            }

            return { x: newX, y };
      }

      shirtRight(board: Array<Array<TicTacToeFlag>>, x: number, y: number) {
            let newY = y;

            while (newY - 1 >= 0 && board[x][newY - 1] === board[x][newY]) {
                  newY -= 1;
            }

            return { x, y: newY };
      }
      calRight(board: Array<Array<TicTacToeFlag>>, { x, y }: { x: number; y: number }) {
            let newY = y;
            let total = 0;
            while (newY + 1 < board.length && board[x][newY + 1] === board[x][newY]) {
                  newY += 1;
                  total += 10;
            }

            return total;
      }

      shirtTopLeft(board: Array<Array<TicTacToeFlag>>, x: number, y: number) {
            let newY = y;
            let newX = x;
            while (newX - 1 >= 0 && newY - 1 >= 0 && board[newX - 1][newY - 1] === board[newX][newY]) {
                  newY -= 1;
                  newX -= 1;
            }

            return { x: newX, y: newY };
      }

      CalTopLeft(board: Array<Array<TicTacToeFlag>>, { x, y }: { x: number; y: number }) {
            let newY = y;
            let newX = x;
            let total = 0;

            while (newX + 1 < board.length && newY + 1 < board.length && board[newX + 1][newY + 1] === board[newX][newY]) {
                  newY += 1;
                  newX += 1;
                  total += 10;
            }

            return total;
      }

      shirtBottomLeft(board: Array<Array<TicTacToeFlag>>, x: number, y: number) {
            let newX = x;
            let newY = y;
            while (newX + 1 < board.length && newY - 1 >= 0 && board[newX + 1][newY - 1] === board[newX][newY]) {
                  newX += 1;
                  newY -= 1;
            }

            return { x: newX, y: newY };
      }

      calBottomLeft(board: Array<Array<TicTacToeFlag>>, { x, y }: { x: number; y: number }) {
            let newX = x;
            let newY = y;
            let total = 0;
            while (newX - 1 >= 0 && newY + 1 < board.length && board[newX - 1][newY + 1] === board[newX][newY]) {
                  newX -= 1;
                  newY += 1;
                  total += 10;
            }

            return total;
      }
}
