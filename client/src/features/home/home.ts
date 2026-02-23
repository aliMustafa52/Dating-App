import { Component, inject } from '@angular/core';
import { Register } from '../account/register/register';
import { Login } from '../account/login/login';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-home',
  imports: [Register, Login],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  accountService = inject(AccountService);
}
