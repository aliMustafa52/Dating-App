import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [
    NgClass
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  activeSection = 'matches'; // Default active section
  isMenuOpen = signal(false);

  accountService = inject(AccountService);

  setSection(section: string) {
    this.activeSection = section;
    this.isMenuOpen.set(false);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  openLogin() {
    this.accountService.authMode.set('login');
    this.isMenuOpen.set(false);
  }

  logout() {
    this.accountService.logout();
    this.isMenuOpen.set(false);
  }
}
