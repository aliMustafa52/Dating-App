import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../core/services/account-service';
import { Member, UpdateMember } from '../../../core/models/member';
import { MemberService } from '../../../core/services/member-service';
import { ToastService } from '../../../core/services/toast-service';
import { MemberSidebar } from '../member-sidebar/member-sidebar';
import { MemberPhotos } from '../member-photos/member-photos';
import { MemberEditForm } from '../member-edit-form/member-edit-form';
@Component({
  selector: 'app-member-detailed',
  imports: [MemberSidebar, MemberPhotos, MemberEditForm],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit {
  private route = inject(ActivatedRoute);
  private memberService = inject(MemberService);
  private toastService = inject(ToastService);
  accountService = inject(AccountService);

  member = signal<Member | null>(null);
  routeMemberId = signal<string | null>(null);
  isEditing = signal(false);
  isSaving = signal(false);

  isCurrentUserProfile = computed(() => {
    const currentUserId = this.accountService.currentUser()?.id;
    const memberIdFromRoute = this.routeMemberId();

    return !!currentUserId && currentUserId === memberIdFromRoute;
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => this.routeMemberId.set(params.get('id'))
    });

    this.route.data.subscribe({
      next: (data) => {
        const member = data['member'] as Member;
        this.member.set(member);
      }
    });

  }

  startEditProfile() {
    const member = this.member();
    if (!member || !this.isCurrentUserProfile()) return;

    this.isEditing.set(true);
  }

  cancelEditProfile() {
    this.isEditing.set(false);
  }

  saveProfile(payload: UpdateMember) {
    this.isSaving.set(true);

    this.memberService.updateMember(payload).subscribe({
      next: (updatedMember) => {
        this.member.set(updatedMember);
        this.accountService.updateCurrentUser({ displayName: updatedMember.displayName });
        this.isEditing.set(false);
        this.isSaving.set(false);
        this.toastService.show('Profile updated successfully', 'success');
      },
      error: () => this.isSaving.set(false),
    });
  }
}
