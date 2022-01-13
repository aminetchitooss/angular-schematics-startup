import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'news-flow',
  templateUrl: './news-flow.component.html',
  styleUrls: ['./news-flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFlowComponent implements OnInit {
  constructor(public _dataService: DataService) {}

  ngOnInit(): void {}
}
