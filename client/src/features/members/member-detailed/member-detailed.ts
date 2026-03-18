import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../../core/services/member-service';
import { Member } from '../../../core/models/member';
import { MemberSidebar } from '../member-sidebar/member-sidebar';
import { MemberPhotos } from '../member-photos/member-photos';

@Component({
  selector: 'app-member-detailed',
  imports: [MemberSidebar, MemberPhotos],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  
  member = signal<Member | null>(null);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.memberService.getMember(id).subscribe({
      next: (member) => this.member.set(member)
    });
  }
}
