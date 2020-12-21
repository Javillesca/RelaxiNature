import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ICarousel } from '../../interfaces/i-carousel';
import { DetailsService } from '../../services/details.service';
import { CARROUSEL_DATA } from '../../data/carousel.const';

@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.scss'],
})
export class MeditationComponent implements OnInit {

  @Output() options = new EventEmitter<any>();
  oCarrouselData: ICarousel[] =  CARROUSEL_DATA;
  time: number = 5;
  timeFormat: string = 'min';
  selected: string = 'waves';

  constructor(private detailsService: DetailsService) { }

  ngOnInit() {}

  onTimeAdd() {
    if ( this.time < 60 ) {
      this.time = this.time + 5;
    }
  }

  onTimeSubtract() {
    if ( this.time > 5 ) {
      this.time = this.time - 5;
    }
  }

  getSelected(pData) {
    this.selected = pData;
  }

  navTo(): void {
    this.detailsService.showDetails('detailmeditation', this.selected, this.time);
  }
}
