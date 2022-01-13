import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ROUTING_SETTING } from '@globalUtils/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User_Model } from 'src/app/shared/store/user/user.model';

@Component({
  selector: 'mobile-routes',
  templateUrl: './mobile-routes.component.html',
  styleUrls: ['./mobile-routes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileRoutesComponent implements OnInit {
  @Input() user: User_Model = {} as User_Model;

  ROUTING_SETTING = ROUTING_SETTING;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logoutPostRedirect();
  }
}
