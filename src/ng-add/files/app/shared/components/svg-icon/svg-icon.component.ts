import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'svg-icon',
  templateUrl: './svg-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {
  /**
   * the source should be in the assets/svg folder
   * @param src
   */
  @Input() src: string | undefined = '';
}
