import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Member } from '../../../core/models/member';
import { AgePipe } from '../../../core/pipes/age-pipe';

@Component({
  selector: 'app-member-sidebar',
  imports: [DatePipe, AgePipe],
  templateUrl: './member-sidebar.html',
})
export class MemberSidebar {
  member = input.required<Member>();
}
