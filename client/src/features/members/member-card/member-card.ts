import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Member } from '../../../core/models/member';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.html',
})
export class MemberCard {
  member = input.required<Member>();
}
