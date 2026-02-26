import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  isMenuOpen = signal(false);

  accountService = inject(AccountService);
  private router = inject(Router);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  logout() {
    this.accountService.logout();
    this.isMenuOpen.set(false);
    this.router.navigateByUrl('/');
  }
}
