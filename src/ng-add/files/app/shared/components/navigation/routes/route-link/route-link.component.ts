import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Route_Link } from '@interfaces/Route_Link';
import { PreloadService } from 'src/app/shared/services/preload.service';

@Component({
  selector: 'route-link',
  templateUrl: './route-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteLinkComponent {
  @Input() link: Route_Link = {} as Route_Link;

  constructor(private _preloadService: PreloadService) {}

  startPreload(pModule: string) {
    this._preloadService.startpreload(pModule);
  }
}
