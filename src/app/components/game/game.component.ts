import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Die } from 'src/app/classes/die';
import { Player } from 'src/app/classes/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {

  playerCount: number = 4;
  playerList: Player[];

  player1: Player = {
    name: 'Luke',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    savedDice: []
  }

  player2: Player = {
    name: 'Vader',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    savedDice: []
  }

  player3: Player = {
    name: 'Yoda',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    savedDice: []
  }

  player4: Player = {
    name: 'Palpatine',
    totalScore: 0,
    currentRoundScore: 0,
    hasTurn: false,
    savedDice: []
  }

  public diceList: Die[];
  public diceToRollList: Die[];
  public savedDiceList: Die[];

  @ViewChild('player1D1Pos', {static: false}) player1Die1Pos: ElementRef;
  @ViewChild('player1D2Pos', {static: false}) player1Die2Pos: ElementRef;
  @ViewChild('player1D3Pos', {static: false}) player1Die3Pos: ElementRef;
  @ViewChild('player1D4Pos', {static: false}) player1Die4Pos: ElementRef;

  @ViewChild('player2D1Pos', {static: false}) player2Die1Pos: ElementRef;
  @ViewChild('player2D2Pos', {static: false}) player2Die2Pos: ElementRef;
  @ViewChild('player2D3Pos', {static: false}) player2Die3Pos: ElementRef;
  @ViewChild('player2D4Pos', {static: false}) player2Die4Pos: ElementRef;

  @ViewChild('player3D1Pos', {static: false}) player3Die1Pos: ElementRef;
  @ViewChild('player3D2Pos', {static: false}) player3Die2Pos: ElementRef;
  @ViewChild('player3D3Pos', {static: false}) player3Die3Pos: ElementRef;
  @ViewChild('player3D4Pos', {static: false}) player3Die4Pos: ElementRef;

  @ViewChild('player4D1Pos', {static: false}) player4Die1Pos: ElementRef;
  @ViewChild('player4D2Pos', {static: false}) player4Die2Pos: ElementRef;
  @ViewChild('player4D3Pos', {static: false}) player4Die3Pos: ElementRef;
  @ViewChild('player4D4Pos', {static: false}) player4Die4Pos: ElementRef;

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
    this.diceToRollList = this.diceList;
  }

  ngAfterViewInit() {
    console.log(this.player1Die1Pos.nativeElement.offsetLeft);
    console.log(this.player1Die1Pos.nativeElement.offsetTop);
    // setTimeout(() => {
    //   this.renderer.setStyle(this.player1Die1Pos.nativeElement, 'position', 'absolute');
    //   let newTop = this.player1Die1Pos.nativeElement.offsetTop + 30;
    //   let newLeft = this.player1Die1Pos.nativeElement.offsetLeft + 30;
    //   console.log(newTop);
    //   this.renderer.setStyle(this.player1Die1Pos.nativeElement, 'top', String(newTop) + 'px');
    //   this.renderer.setStyle(this.player1Die1Pos.nativeElement, 'left', String(newLeft) + 'px');
    // }, 2000)
  }

  rollDice(): void {
    this.diceToRollList.forEach(die => {
      die.value = Math.floor(Math.random() * Math.floor(die.sides)) + 1;
      console.log('Die value: ' + die.value);
    });
  }

  getPlayersDicePositions(): void {

  }


}
