import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { Login } from '../features/account/login/login';
import { Register } from '../features/account/register/register';
import { Messages } from '../features/messages/messages';
import { Lists } from '../features/lists/lists';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { authGuard } from '../core/guards/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';
import { memberResolver } from '../features/members/member-resolver';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberList },
            {
                path: 'members/:id',
                resolve: { member: memberResolver },
                runGuardsAndResolvers: 'always',
                component: MemberDetailed
            },
            { path: 'lists', component: Lists },
            { path: 'messages', component: Messages },
            { path: 'test-errors', component: TestErrors }
        ]
    },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'server-error', component: ServerError },
    { path: '**', component: NotFound }
];
