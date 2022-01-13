import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { PreloadService } from '@services/preload.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'underside-nav',
  templateUrl: './underside-nav.component.html',
  styleUrls: ['./underside-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UndersideNavComponent {
  @Output() closeDrawer: any = new EventEmitter<void>();
  constructor(private authService: AuthService, private preloadService: PreloadService) {}

  switchRoute() {
    this.closeDrawer.emit();
  }

  logout() {
    this.authService.logoutPostRedirect();
  }

  startPreload() {
    this.preloadService.startpreload('policies');
  }
}
