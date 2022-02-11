import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ROUTING_SETTING, SETTINGS_ALLOWED_USER } from '@globalUtils/constants';
import { hasAccess } from '@globalUtils/functions';
import { Route_Link } from '@interfaces/Route_Link';
import { User_Model } from 'src/app/shared/store/user/user.model';

@Component({
  selector: 'routes',
  templateUrl: './routes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutesComponent implements OnInit {
  @Input() user: User_Model = {} as User_Model;

  links: Route_Link[] = [];

  constructor() {}

  ngOnInit() {
    const links = [
      {
        title: 'Settings',
        route: ROUTING_SETTING,
        src: 'settings',
        allowedUsers: SETTINGS_ALLOWED_USER
      }
    ];
    this.links = links.filter((link) => hasAccess(this.user, link.allowedUsers));
  }
}
