import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Platform } from '@ionic/angular';
import * as countdown from 'countdown';
import { IDetails } from '../../interfaces/i-details';
import { DetailsService } from '../../services/details.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { ICountDown } from '../../interfaces/i-countdown';

@Component({
  selector: 'app-details-meditation',
  templateUrl: './details-meditation.component.html',
  styleUrls: ['./details-meditation.component.scss'],
})

export class DetailsMeditationComponent implements OnInit, OnDestroy{

  @ViewChild('aSound') aSound: ElementRef;
  @ViewChild('aTibetanBowl') aTibetanBowl: ElementRef;

  detail: IDetails;
  mode: ProgressSpinnerMode = 'determinate';
  time: number;
  endDate: Date = new Date();
  pCountdown: ICountDown;
  oCountdown: any;
  volume: number = 0.5;
  percent: number = 1;
  subscribe: any;

  constructor(private activatedRoute: ActivatedRoute,
              private detailsService: DetailsService,
              public dialog: MatDialog,
              public platform: Platform
            ) {
      this.activatedRoute.params.subscribe( params => {
        this.detail = this.detailsService.getData(params['id']);
        this.detail.tibetanBowl = './assets/sounds/tibetanBowl.mp3';
        this.time = params['time'];
        this.pCountdown = null;
        this.oCountdown = null;
      });
      this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
        this.goBack();
      });
  }

  ngOnInit(): void {
    const finishTime = (this.time - 1) * 60;
    this.time = Number(this.time) + Number(this.endDate.getMinutes());
    this.endDate.setMinutes(this.time);
    this.oCountdown = countdown(this.endDate, (ts) => {
      this.pCountdown = ts;
      let sInit;
      if (ts.hours !== 0) {
        sInit = (ts.hours * 3600) + (ts.minutes * 60) + ts.seconds;
      } else {
        sInit = (ts.minutes * 60) + ts.seconds;
      }
      this.percent = 100 - (( sInit * 100) / finishTime);
      if (this.percent === 100) {
        this.aSound.nativeElement.pause();
        this.aTibetanBowl.nativeElement.pause();
        clearInterval(this.oCountdown);
        const urlImg: string[] = this.detail.gif.split('/');
        this.detail.gif = '/' + urlImg[1] + '/img/' + urlImg[3].split('.')[0] + '.png';
        this.openDialog();
      }
    }, countdown.HOURS | countdown.MINUTES | countdown.SECONDS );
  }

  goBack(): void {
    this.detailsService.navBack('meditation');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: 'dm_dialog_title', message: 'dm_dialog_message'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.detailsService.navTo('meditation');
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.oCountdown);
  }
}
