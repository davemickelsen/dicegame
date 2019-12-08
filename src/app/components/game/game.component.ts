import { Component, OnInit } from '@angular/core';
import { Die } from 'src/app/classes/die';
import { Player } from 'src/app/classes/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  playerCount: number = 4;
  playerList: Player[];

  player1: Player = {
    name: 'Luke',
    totalScore: 0,
    currentRoundScore: 0
  }

  player2: Player = {
    name: 'Vader',
    totalScore: 0,
    currentRoundScore: 0
  }

  player3: Player = {
    name: 'Yoda',
    totalScore: 0,
    currentRoundScore: 0
  }

  player4: Player = {
    name: 'Palpatine',
    totalScore: 0,
    currentRoundScore: 0
  }

  public diceList: Die[];
  public diceToRollList: Die[];
  public savedDiceList: Die[];

  die1: Die = {
    sides: 6,
    value: 1
  }

  die2: Die = {
    sides: 6,
    value: 1
  }

  die3: Die = {
    sides: 6,
    value: 1
  }

  die4: Die = {
    sides: 6,
    value: 1
  }

  die5: Die = {
    sides: 6,
    value: 1
  }

  rounds: number = 4;
  currentRound: number = 0;

  testValues: string;

  constructor() { }

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
    this.diceToRollList = this.diceList;
  }

  rollDice(): void {
    this.diceToRollList.forEach(die => {
      die.value = Math.floor(Math.random() * Math.floor(die.sides)) + 1;
      console.log('Die value: ' + die.value);
    });
  }

  

}
