import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'news-backlog',
  templateUrl: './news-backlog.component.html',
  styleUrls: ['./news-backlog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsBacklogComponent implements OnInit {
  constructor(public _dataService: DataService) {}

  ngOnInit(): void {}
}
