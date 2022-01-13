import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon.component';
import { SvgIconPipe } from './svg-icon.pipe';

@NgModule({
  declarations: [SvgIconComponent, SvgIconPipe],
  imports: [CommonModule],
  exports: [SvgIconComponent, SvgIconPipe]
})
export class SvgIconModule {}
