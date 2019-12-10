import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Die } from 'src/app/classes/die';
import { Player } from 'src/app/classes/player';
import * as _ from 'lodash';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  playerCount: number = 4;
  playerList: Player[];
  currentPlayer: number = 0;

  @ViewChild('player1DiceBox', { static: false }) player1DiceBox: ElementRef;
  @ViewChild('player2DiceBox', { static: false }) player2DiceBox: ElementRef;
  @ViewChild('player3DiceBox', { static: false }) player3DiceBox: ElementRef;
  @ViewChild('player4DiceBox', { static: false }) player4DiceBox: ElementRef;

  player1: Player = {
    name: 'Luke',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    diceList: [],
    turnNumber: 1,
    isWinner: false
  }

  player2: Player = {
    name: 'Vader',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    diceList: [],
    turnNumber: 2,
    isWinner: false
  }

  player3: Player = {
    name: 'Yoda',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    diceList: [],
    turnNumber: 3,
    isWinner: false
  }

  player4: Player = {
    name: 'Palpatine',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    diceList: [],
    turnNumber: 4,
    isWinner: false
  }

  public diceList: Die[];
  public diceToRollList: Die[];

  die1: Die = {
    sides: 6,
    value: 1,
    faceValue: 1,
    id: 1,
    shake: false
  }

  die2: Die = {
    sides: 6,
    value: 1,
    faceValue: 1,
    id: 2,
    shake: false
  }

  die3: Die = {
    sides: 6,
    value: 1,
    faceValue: 1,
    id: 3,
    shake: false
  }

  die4: Die = {
    sides: 6,
    value: 1,
    faceValue: 1,
    id: 4,
    shake: false
  }

  die5: Die = {
    sides: 6,
    value: 1,
    faceValue: 1,
    id: 5,
    shake: false
  }

  rounds: number = 4;
  currentRound: number = 0;

  ngOnInit() {
    this.playerList = [
      this.player1,
      this.player2,
      this.player3,
      this.player4
    ];
    this.diceList = [
      this.die1,
      this.die2,
      this.die3,
      this.die4,
      this.die5
    ];
  }

  playGame(): void {
    this.playerList = _.shuffle(this.playerList);
    this.playerList.forEach((player, i) => {
      player.turnNumber = i + 1;
    });
    this.currentPlayer = 0;
    this.setCurrentPlayer();
    this.roll(true);
  }

  setCurrentPlayer(): void {
    this.playerList.forEach((player) => {
      player.hasTurn = false;
    });
    this.playerList[this.currentPlayer].hasTurn = true;
  }

  resetDice(): void {
    this.diceToRollList = [];
    this.diceList.forEach(die => this.diceToRollList.push(die));
    this.playerList.forEach((player) => {
      player.diceList = [];
    });
  }

  roll(resetDice: boolean): void {
    setTimeout(() => {
      if(resetDice) {
        this.resetDice();
      }
      this.rollDice();
    }, 1000);

    setTimeout(() => {
      this.evaluateDice(4);
    }, 3000);

    setTimeout(() => {
      this.endTurnCheck();
    }, 4000);
  }

  rollDice(): void {
    this.diceToRollList.forEach((die, i) => {
      die.faceValue = this.getRandomRange(1, 6);
      if (die.faceValue === 4) {
        die.value = 0;
      }
      else {
        die.value = die.faceValue;
      }
    });
  }

  evaluateDice(targetValue: number): void {
    let foundTarget = false;
    for (let i = 0; i < this.diceToRollList.length; i++) {
      if (this.diceToRollList[i].faceValue === targetValue) {
        this.playerList[this.currentPlayer].diceList.push(this.diceToRollList[i]);
        this.diceToRollList.splice(i, 1);
        i--;
        foundTarget = true;
      }
    }

    if(!foundTarget) {
      this.diceToRollList = _.orderBy(this.diceToRollList, ['value'], ['asc']);
      this.playerList[this.currentPlayer].diceList.push(this.diceToRollList[0]);
      this.diceToRollList.splice(0, 1);
    }
  }

  endTurnCheck(): void {
    if (this.diceToRollList.length < 1) {
      // this.playerList[this.currentPlayer].diceList.push(this.diceToRollList[0]);
      // this.diceToRollList.splice(0, 1);
      this.diceToRollList = [];
      this.setPlayerScore();

      //End round check
      if (this.currentPlayer === 3) {
        this.currentPlayer = 0;
        this.endRoundCheck();
        this.setCurrentPlayer();
      }
      //End turn check
      else {
        this.currentPlayer++;
        this.setCurrentPlayer();
        this.roll(true);
      }
    }
    else {
      this.roll(false);
    }
  }

  setPlayerScore(): void {
    this.playerList[this.currentPlayer].diceList.forEach((die) => {
      this.playerList[this.currentPlayer].totalScore += die.value;
    });
  }

  endRoundCheck() {
    if (this.currentRound === this.rounds - 1) {
      this.endGame();
    }
    else {
      this.currentRound++;
      this.currentPlayer = 0;
      this.roll(true);
    }
  }

  endGame(): void {
    this.playerList.forEach((player) => {
      player.hasTurn = false;
    });
    this.playerList = _.orderBy(this.playerList, ['totalScore'], ['asc']);
    this.playerList.forEach((player) => {
      if (player.totalScore === this.playerList[0].totalScore) {
        player.isWinner = true;
      }
    });
  }

  getRandomRange(min: number, max: number): number {
    return Math.floor(Math.random() * Math.floor(max)) + min;
  }
}
