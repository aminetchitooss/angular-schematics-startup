import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { profilePicture } from '@interfaces/profilePicture';

@Component({
  selector: 'picture',
  templateUrl: './picture.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PictureComponent implements OnInit {
  @Input() profile: profilePicture = {} as profilePicture;
  constructor() {}

  ngOnInit(): void {
    // console.count('picture');
  }

  clearAnimation(circle: any) {
    setTimeout(() => {
      circle.classList.remove('animate');
    }, 5000);
  }

  loadImage(circle: any, image: any) {
    setTimeout(() => {
      circle.classList.remove('animate');
      image.classList.remove('hide');
    }, 500);
  }
}
