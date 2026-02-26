import { Injectable, signal } from '@angular/core';


export type ToastType = 'success' | 'error' | 'info';

export interface ToastData {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // Signal to hold the current toast data
  toastSignal = signal<ToastData | null>(null);
  private timeoutId: any;

  show(message: string, type: ToastType = 'info') {
    // Clear any existing timeout so they don't overlap
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Set the new toast
    this.toastSignal.set({ message, type });

    // Auto-hide after 3 seconds
    this.timeoutId = setTimeout(() => {
      this.toastSignal.set(null);
    }, 3000);
  }

  hide() {
    this.toastSignal.set(null);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
