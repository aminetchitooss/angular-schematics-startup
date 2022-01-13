import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { projectVersion } from 'src/app/app.env';
import { User_Model } from 'src/app/shared/store/user/user.model';

@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProfilComponent implements OnInit {
  version = projectVersion;

  // isDarkMode = isDarkTheme();
  @Input() user: User_Model = {} as User_Model;
  constructor() {}

  ngOnInit(): void {}
}
