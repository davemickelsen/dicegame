import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.scss']
})
export class DieComponent implements OnChanges {

  @Input() dieValue: number;
  @Input() shake: boolean;
  dieClass: string;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.dieValue.previousValue !== changes.dieValue.currentValue) {
      this.setFaceValue();
    }
  }

  setFaceValue(): void {
    switch(this.dieValue) {
      case 1:
        this.dieClass = 'one';
        break;
      case 2:
        this.dieClass = 'two';
        break;
      case 3:
        this.dieClass = 'three';
        break;
      case 4:
        this.dieClass = 'four';
        break;
      case 5:
        this.dieClass = 'five';
        break;
      case 6:
        this.dieClass = 'six';
        break;
    }
  }
}
