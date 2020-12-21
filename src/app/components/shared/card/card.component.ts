import { Component, OnInit, Input } from '@angular/core';
import { DetailsService } from '../../../services/details.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  constructor(private detailsService: DetailsService) {}

  @Input() vRelax: any;

  ngOnInit() {}

  navTo(data: string): void {
    this.detailsService.showDetails('detailrelax', data, null);
  }
}

