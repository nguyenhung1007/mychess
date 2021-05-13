export interface TicTacToePlayer {
      id: string;
      flag: TicTacToeFlag.BLUE | TicTacToeFlag.RED;
      time: number;
      ready: boolean;
      username: string;
      elo: number;
      avatarUrl: string;
      name: string;
}

export interface TicTacToeBotMovePoint {
      x: number;
      y: number;
      point: number;
}
export enum TicTacToeFlag {
      EMPTY = -1,
      BLUE = 0,
      RED = 1,
}

export enum TicTacToeStatus {
      'NOT-YET' = 0,
      'PLAYING' = 1,
      'END' = 2,
}

export interface EloCalculator {
      redElo: number;
      blueElo: number;
}
