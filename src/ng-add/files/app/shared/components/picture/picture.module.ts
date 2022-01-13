import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component';
import { AuthPicturePipe } from './auth-picture.pipe';



@NgModule({
  declarations: [
    PictureComponent,
    AuthPicturePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PictureComponent,
    AuthPicturePipe
  ]
})
export class PictureModule { }
