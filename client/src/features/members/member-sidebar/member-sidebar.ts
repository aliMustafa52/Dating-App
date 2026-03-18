import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Member } from '../../../core/models/member';

@Component({
  selector: 'app-member-sidebar',
  imports: [DatePipe],
  templateUrl: './member-sidebar.html',
})
export class MemberSidebar {
  member = input.required<Member>();
}
