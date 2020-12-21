import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsService } from '../../../services/details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  @Output() sidenavToggle = new EventEmitter();
  href: string;

  constructor(private router: Router) {
    router.events.subscribe( () => {
      this.router.config.forEach( async (eachRoute) => {
        const path = '/' + eachRoute.path;
        if (path === this.router.url)  {
          this.title = eachRoute.data.routeName;
        }
      });
    });
  }

  ngOnInit() {}

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
