import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  constructor(public _dataService: DataService) {}
  ngOnInit(): void {}
}
