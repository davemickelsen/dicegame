import { Die } from './die';

export class Player {
    public name: string;
    public totalScore: number = 0;
    public currentRoundScore: number = 0;
    public hasTurn: boolean;
    public diceList: Die[];
    public turnNumber: number;
}
