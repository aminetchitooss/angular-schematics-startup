import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Route_Link } from '@interfaces/Route_Link';
import { PreloadService } from 'src/app/shared/services/preload.service';

@Component({
  selector: 'route-link',
  templateUrl: './route-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteLinkComponent implements OnInit {
  @Input() link: Route_Link = {} as Route_Link;

  constructor(private preloadService: PreloadService) {}

  ngOnInit(): void {}

  startPreload(pModule: string) {
    this.preloadService.startpreload(pModule);
  }
}
