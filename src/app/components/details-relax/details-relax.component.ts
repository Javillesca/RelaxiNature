import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../services/details.service';
import { IDetails } from '../../interfaces/i-details';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-details-relax',
  templateUrl: './details-relax.component.html',
  styleUrls: ['./details-relax.component.scss'],
})
export class DetailsRelaxComponent {

  @ViewChild('aSound') aSound: ElementRef;

  detail: IDetails;
  value: number = 0.5;
  subscribe: any;

  constructor(private activatedRoute: ActivatedRoute,
              private detailsService: DetailsService,
              public platform: Platform){
    this.activatedRoute.params.subscribe( params => {
      this.detail = this.detailsService.getData(params.id);
    });
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      this.goBack();
    });
 }

  onAction(): any {
    const type: string[] = this.detail.gif.split('.');
    const temp = type[1].split('/');
    let change: string;

    if (type[2] === 'gif') {
      change = './' + temp[1] + '/img/' + temp[3] + '.png';
      this.aSound.nativeElement.pause();
    } else if (type[2] === 'png') {
      change = './' + temp[1] + '/gif/' + temp[3] + '.gif';
      this.aSound.nativeElement.play();
    }
    this.detail.gif = change;
  }

  goBack(): void {
    this.detailsService.navBack('relax');
  }
}
