import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relax',
  templateUrl: './relax.component.html',
  styleUrls: ['./relax.component.scss'],
})
export class RelaxComponent implements OnInit {

  cards: string[] = ['waves', 'fire', 'river', 'forest', 'wind', 'desert', 'rain', 'snow'];

  constructor() {
  }

  ngOnInit() {}

}
