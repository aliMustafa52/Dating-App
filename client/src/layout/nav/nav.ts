import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav',
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  activeSection = 'matches'; // Default active section

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  setSection(section: string) {
    this.activeSection = section;
  }

  onLogin() {
    if (this.loginForm.valid) {
      // getRawValue() gets the strictly typed object: { email: string, password: string }
      const credentials = this.loginForm.getRawValue();
      console.log('Login form submitted!', credentials);
      // Add your auth logic here
    } else {
      // Marks all fields as touched so validation errors can be shown if you add them later
      this.loginForm.markAllAsTouched();
    }
  }
}
