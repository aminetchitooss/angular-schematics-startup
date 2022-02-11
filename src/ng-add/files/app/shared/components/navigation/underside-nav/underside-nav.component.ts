import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PreloadService } from '@services/preload.service';
import { User_Model } from '@store/user/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'underside-nav',
  templateUrl: './underside-nav.component.html',
  styleUrls: ['./underside-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UndersideNavComponent {
  @Output() closeDrawer: any = new EventEmitter<void>();
  constructor(private _authService: AuthService, private _preloadService: PreloadService) {}

  switchRoute() {
    this.closeDrawer.emit();
  }

  logout() {
    this._authService.logoutPostRedirect();
  }

  startPreload() {
    this._preloadService.startpreload('policies');
  }
}
