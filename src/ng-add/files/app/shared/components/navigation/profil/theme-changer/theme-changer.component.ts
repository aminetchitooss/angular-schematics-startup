import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: ['./theme-changer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeChangerComponent {
  @Input() isDarkMode: boolean = false;

  // handleThemeSwitch(): void {
  //   toggleTheme();
  // }
}
