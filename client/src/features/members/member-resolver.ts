import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { MemberService } from '../../core/services/member-service';
import { Member } from '../../core/models/member';
import { EMPTY } from 'rxjs';

export const memberResolver: ResolveFn<Member> = (route, state) => {
  const memberService = inject(MemberService);
  const memberId = route.paramMap.get('id');
  const router = inject(Router);

  if (memberId) {
    return memberService.getMember(memberId);
  }

  router.navigate(['/not-found']);
  return EMPTY;
};
