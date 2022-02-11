import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorComponent } from './sponsor.component';
import { SvgIconModule } from '@components/svg-icon/svg-icon.module';

@NgModule({
  declarations: [SponsorComponent],
  imports: [CommonModule, SvgIconModule],
  exports: [SponsorComponent]
})
export class SponsorModule {}
