import http from './axiosCommon';
import { AxiosInstance } from 'axios';
import { AddMoveDto, RoomIdDto } from '../common/interface/dto/ttt.dto';
import { ChessChooseAPieceDTO } from '../common/interface/dto/chess.dto';
import { ChessMoveRedis } from '../common/interface/chess.interface';
import { ServerResponse } from '../common/interface/api.interface';
import { TicTacToeBoard } from '../common/interface/tic-tac-toe.interface';

export class ChessAPI {
    constructor(private readonly apiCall: AxiosInstance, readonly prefix: string) {}

    async createNewPvPRoom() {
        const url = `${this.prefix + '/pvp'}`;
        const res = await this.apiCall.post<ServerResponse<RoomIdDto>>(url);
        return res;
    }
    async getAllGameByUserId(userId: string) {
        const url = `${this.prefix}/${userId}`;
        const res = await this.apiCall.get<ServerResponse<{ boards: TicTacToeBoard[]; count: number }>>(url);
        return res;
    }
    async createNewBotRoom() {
        const url = `${this.prefix}/bot`;
        const res = await this.apiCall.post<ServerResponse<RoomIdDto>>(url);
        return res;
    }
    async addMovePvP(input: { roomId: string; curPos: { x: number; y: number }; desPos: { x: number; y: number } }) {
        const url = `${this.prefix}/add-move`;
        const res = await this.apiCall.put<ServerResponse<RoomIdDto>>(url, input);
        return res;
    }
    async readyGame(input: RoomIdDto) {
        const url = `${this.prefix}/ready`;
        const res = await this.apiCall.put<ServerResponse<RoomIdDto>>(url, input);
        return res;
    }

    async leaveGame(input: RoomIdDto) {
        const url = `${this.prefix}/leave`;
        const res = await this.apiCall.put<ServerResponse<RoomIdDto>>(url, input);
        return res;
    }

    async startGame(input: RoomIdDto) {
        const url = `${this.prefix}/start`;
        const res = await this.apiCall.put<ServerResponse<null>>(url, input);
        return res;
    }

    async restartGame(input: RoomIdDto) {
        const url = `${this.prefix}/restart`;
        const res = await this.apiCall.post<ServerResponse<RoomIdDto>>(url, input);
        return res;
    }

    async joinRoom(input: RoomIdDto) {
        const url = `${this.prefix}/join-room`;
        const res = await this.apiCall.put<ServerResponse<TicTacToeBoard>>(url, input);
        return res;
    }
    async getSuggestion(input: ChessChooseAPieceDTO) {
        const url = `${this.prefix}/choose-piece`;
        const res = await this.apiCall.post<ServerResponse<ChessMoveRedis[]>>(url, input);
        return res;
    }
}
export const chessApi = new ChessAPI(http, '/chess');
export default chessApi;
