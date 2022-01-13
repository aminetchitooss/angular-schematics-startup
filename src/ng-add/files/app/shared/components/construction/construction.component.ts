import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstructionComponent implements OnInit {
  @Input() msg: string = 'This section ';
  constructor() {}

  ngOnInit(): void {}
}
