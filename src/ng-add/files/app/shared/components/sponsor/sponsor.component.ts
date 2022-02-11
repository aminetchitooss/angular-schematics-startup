import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
