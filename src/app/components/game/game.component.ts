import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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

  @ViewChild('player1DiceBox', {static: false}) player1DiceBox: ElementRef;
  @ViewChild('player2DiceBox', {static: false}) player2DiceBox: ElementRef;
  @ViewChild('player3DiceBox', {static: false}) player3DiceBox: ElementRef;
  @ViewChild('player4DiceBox', {static: false}) player4DiceBox: ElementRef;

  player1: Player = {
    name: 'Luke',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    diceList: [],
    turnNumber: 1
  }

  player2: Player = {
    name: 'Vader',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    diceList: [],
    turnNumber: 2
  }

  player3: Player = {
    name: 'Yoda',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    diceList: [],
    turnNumber: 3
  }

  player4: Player = {
    name: 'Palpatine',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    diceList: [],
    turnNumber: 4
  }

  public diceList: Die[];
  public diceToRollList: Die[];

  die1: Die = {
    sides: 6,
    value: 1,
    faceValue: 1,
    id: 1
  }

  die2: Die = {
    sides: 6,
    value: 1,
    faceValue: 1,
    id: 2
  }

  die3: Die = {
    sides: 6,
    value: 1,
    faceValue: 1,
    id: 3
  }

  die4: Die = {
    sides: 6,
    value: 1,
    faceValue: 1,
    id: 4
  }

  die5: Die = {
    sides: 6,
    value: 1,
    faceValue: 1,
    id: 5
  }

  rounds: number = 4;
  currentRound: number = 0;

  constructor(private renderer: Renderer2) { }

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

  startGame(): void {
    // console.log(this.playerList);
    this.playerList = _.shuffle(this.playerList);
    this.playerList.forEach((player, i) => {
      player.turnNumber = i + 1;
    });
    this.currentPlayer = 0;
    this.setCurrentPlayer();
    this.resetDice();
  }

  setCurrentPlayer(): void {
    this.playerList.forEach((player) => {
      player.hasTurn = false;
    });
    this.playerList[this.currentPlayer].hasTurn = true;
    // console.log(this.playerList);
  }

  resetDice(): void {
    this.diceToRollList = this.diceList;
    this.playerList.forEach((player) => {
      player.diceList = [];
    });
  }

  roll(): void {
    console.log("---------------------roll---------------------");
    this.rollDice();
    // setTimeout(() => {
    //   this.evaluateDice(4);
    // }, 2000);

    if(!this.evaluateDice(4)) {
      this.getLowestValueDice();
    }

    this.endTurnCheck();
    // console.log("diceToRollList ", this.diceToRollList);
    // console.log("currentPlayerdice ", this.playerList[this.currentPlayer].diceList);
  }

  rollDice(): void {
    this.diceToRollList.forEach(die => {
      die.faceValue = this.getRandomRange(1, 6);
      if(die.faceValue === 4) {
        die.value = 0;
      }
      else {
        die.value = die.faceValue;
      }
      // console.log("die.value " + die.value);
    });
  }

  evaluateDice(targetValue: number): boolean {
    let foundTarget = false;
    for (let i = 0; i < this.diceToRollList.length; i++) {
      if(this.diceToRollList[i].value === targetValue) {
        this.playerList[this.currentPlayer].diceList.push(this.diceToRollList[i]);
        this.diceToRollList.splice(i, 1);
        foundTarget = true;
      }
    }
    return foundTarget;
  }

  getLowestValueDice(): void {
    console.log("getLowestValueDice");
    this.diceToRollList = _.orderBy(this.diceToRollList, ['value'], ['asc']);
    this.playerList[this.currentPlayer].diceList.push(this.diceToRollList[0]);
    this.diceToRollList.shift();
  }

  endTurnCheck(): void {
    if(this.diceToRollList.length <= 1) {
      this.playerList[this.currentPlayer].diceList.push(this.diceToRollList[0]);
      this.diceToRollList.splice(0, 1);
      this.diceToRollList = [];
      this.setPlayerScore();

      if(this.currentPlayer === 3) {
        this.currentPlayer = 0;
        this.endRoundCheck();
        this.resetDice();
        this.setCurrentPlayer();
      }
      else {
        this.resetDice();
        console.log("next player");
        this.currentPlayer++;
        this.setCurrentPlayer();
        // this.roll();
      }
    }
    else {
      this.roll();
    }
  }

  setPlayerScore(): void {
    this.playerList[this.currentPlayer].diceList.forEach((die) => {
      this.playerList[this.currentPlayer].totalScore += die.value;
    });
  }

  endRoundCheck() {
    if(this.currentRound === this.rounds - 1) {
      this.endGame();
    }
    else {
      this.currentRound++;
      this.currentPlayer = 0;
      console.log("next round");          
    }
  }

  endGame(): void {
    console.log("Game over! ******************************************");
  }

  getRandomRange(min: number, max: number): number {
    return Math.floor(Math.random() * Math.floor(max)) + min;
  }
}
