import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  accountService = inject(AccountService);
  private router = inject(Router);
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  registerForm = new FormGroup({
    displayName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4), Validators.maxLength(16)] }),
  });

  onRegister() {
    if (this.registerForm.valid) {
      this.loading.set(true);
      this.errorMessage.set(null);
      const formValue = this.registerForm.getRawValue();

      this.accountService.register(formValue).subscribe({
        next: _ => {
          this.loading.set(false);
          this.router.navigateByUrl('/members');
        },
        error: err => {
          this.errorMessage.set(err.error?.message || err.error || 'Registration failed');
          this.loading.set(false);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
