import { Component, input } from '@angular/core';
import { Photo } from '../../../core/models/member';

@Component({
  selector: 'app-member-photos',
  imports: [],
  templateUrl: './member-photos.html',
})
export class MemberPhotos {
  photos = input.required<Photo[]>();
}
