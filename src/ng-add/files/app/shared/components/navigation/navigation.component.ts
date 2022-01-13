import { ChangeDetectionStrategy, Component, Input, NgZone, OnDestroy } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { MIN_LARGE_SCREEN, MIN_MID_SCREEN } from '../../global-utils/constants';
import { DataService } from '../../services/data.service';
import { User_Model } from '../../store/user/user.model';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnDestroy {
  constructor(private _ngZone: NgZone, public dataService: DataService) {
    this.initDetectResize();
  }
  @Input() user: User_Model = {} as User_Model;

  oldWidth = document.body.clientWidth;
  isMidScreen: boolean = this.isLayoutMidScreen();

  readonly isHandset$ = this.dataService.isHandset$.pipe(
    shareReplay(),
    tap((res) => (this.isMidScreen = res))
  );

  toggleNavOnMobile(pDrawer: MatSidenav) {
    if (this.isMidScreen) pDrawer.close();
  }

  private isLayoutMidScreen(): boolean {
    return document.body.clientWidth < MIN_LARGE_SCREEN;
  }

  private handleDocumentClick() {
    const newWidth = document.body.clientWidth;

    // mid screen layout
    if ((this.oldWidth >= MIN_LARGE_SCREEN && newWidth < MIN_LARGE_SCREEN) || (newWidth >= MIN_LARGE_SCREEN && this.oldWidth < MIN_LARGE_SCREEN))
      this._ngZone.run(() => {
        this.dataService.updateNavbarLayout(newWidth < MIN_LARGE_SCREEN);
      });

    // mobile layout
    if ((this.oldWidth >= MIN_MID_SCREEN && newWidth < MIN_MID_SCREEN) || (newWidth >= MIN_MID_SCREEN && this.oldWidth < MIN_MID_SCREEN))
      this._ngZone.run(() => {
        this.dataService.updateLayout(newWidth < MIN_MID_SCREEN);
      });

    this.oldWidth = newWidth;
  }

  private initDetectResize() {
    this.handleBind = this.handleDocumentClick.bind(this);
    this._ngZone.runOutsideAngular(() => {
      this.toggleEventListener();
    });
  }

  handleBind: any;
  private toggleEventListener(add = true) {
    if (add) window.addEventListener('resize', this.handleBind, false);
    else window.removeEventListener('resize', this.handleBind, false);
  }

  ngOnDestroy(): void {
    // console.log('cancelled');
    this.toggleEventListener(false);
  }
}
