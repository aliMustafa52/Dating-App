import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiError } from '../../../core/models/error';

@Component({
  selector: 'app-server-error',
  imports: [RouterLink],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  protected error = signal<ApiError | null>(null);
  private router = inject(Router);
  protected showDetails = signal(false);

  constructor() {
    const navigation = this.router.currentNavigation();
    if (navigation?.extras?.state) {
      this.error.set(navigation.extras.state['error']);
    }
  }

  detailsToggle() {
    this.showDetails.update(value => !value);
  }
}
