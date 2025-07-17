export interface ISession {
  isActive: boolean;
  timeLeft: number;
  playersCount: number;
}

export interface ISessionStatus {
  isActive: boolean;
  timeLeft: number;
  hasJoined: boolean;
  hasPicked: boolean;
  pick: number | null;
  players: number;
  nextSessionStart: number | null;
}

export interface IPlayer {
  username: string;
  pick: number | null;
  wins: number;
}

export interface IResults {
  winningNumber: number;
  players: IPlayer[];
  winners: IPlayer[];
}

export interface ILeaderboard {
  leaderboard: IPlayer[];
}