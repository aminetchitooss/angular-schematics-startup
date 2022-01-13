import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { User_Model } from '../../store/user/user.model';

@Component({
  selector: 'error-user',
  templateUrl: './error-user.component.html',
  styleUrls: ['./error-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorUserComponent implements OnInit {
  @Input() error: User_Model = {} as User_Model;
  constructor() {}

  ngOnInit(): void {}
}
