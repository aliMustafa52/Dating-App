import { Component, inject } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Router, RouterOutlet } from '@angular/router';
import { ToastComponent } from "../core/toast.component";

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private accountService = inject(AccountService);
  protected router = inject(Router);
}