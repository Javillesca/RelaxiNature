import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICarousel } from '../../../interfaces/i-carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {

  @Input() height = '550px';
  @Input() items: ICarousel[] = [];
  @Output() selected = new EventEmitter<string>();

  currentPosition = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.items.map((i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  setCurrentPosition(position: number) {
    this.currentPosition = position;
    this.items.find(i => i.id === 0).marginLeft = -100 * position;
  }

  setNext() {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if ( nextPosition <= this.items.length - 1 ) {
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    this.items.find(i => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
    this.selected.emit(this.items.find(i => i.id === this.currentPosition).link);

  }

  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition - 1;
    if ( backPosition >= 0 ) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = - 100 * backPosition;
    }
    this.items.find(i => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = backPosition;
    this.selected.emit(this.items.find(i => i.id === this.currentPosition).link);
  }

}