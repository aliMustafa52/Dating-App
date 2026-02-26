import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  accountService = inject(AccountService);
  private router = inject(Router);
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  onLogin() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.errorMessage.set(null);
      const credentials = this.loginForm.getRawValue();

      this.accountService.login(credentials).subscribe({
        next: _ => {
          this.loginForm.reset();
          this.loading.set(false);
          this.router.navigateByUrl('/members');
        },
        error: err => {
          this.errorMessage.set(err.error?.message || err.error || 'Login failed');
          this.loading.set(false);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
