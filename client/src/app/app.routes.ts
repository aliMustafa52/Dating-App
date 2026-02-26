import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { Login } from '../features/account/login/login';
import { Register } from '../features/account/register/register';
import { Messages } from '../features/messages/messages';
import { Lists } from '../features/lists/lists';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'members', component: MemberList, canActivate: [authGuard] },
    { path: 'members/:id', component: MemberDetailed },
    { path: 'lists', component: Lists, canActivate: [authGuard] },
    { path: 'messages', component: Messages, canActivate: [authGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
