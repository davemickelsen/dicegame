import { Die } from './die';

export class Player {
    name: string;
    totalScore: number = 0;
    currentRoundScore: number = 0;
    hasTurn: boolean;
    diceList: Die[];
    turnNumber: number;
    isWinner: boolean;
}
