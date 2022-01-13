import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ROUTING_SETTING } from '@globalUtils/constants';
import { Route_Link } from '@interfaces/Route_Link';
import { User_Model } from 'src/app/shared/store/user/user.model';

@Component({
  selector: 'routes',
  template: `<route-link *ngFor="let route of links" [link]="route"></route-link>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutesComponent implements OnInit {
  @Input() user: User_Model = {} as User_Model;
  links: Route_Link[] = [];

  constructor() {}
  ngOnInit() {
    this.links = [
      {
        title: 'Settings',
        route: ROUTING_SETTING,
        src: 'settings'
      }
    ];
  }
}
