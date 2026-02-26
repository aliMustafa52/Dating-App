import { Component, inject } from '@angular/core';
import { ToastService } from './services/toast-service';

@Component({
    selector: 'app-toast',
    standalone: true,
    template: `
    @if (toastService.toastSignal(); as toast) {
  <div class="fixed top-20 right-6 z-[100] animate-in slide-in-from-top-5 fade-in duration-300">
    
    <div class="flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl bg-bg-sidebar border border-divider border-l-4"
         [class.border-l-status-dnd]="toast.type === 'error'"
         [class.border-l-status-online]="toast.type === 'success'"
         [class.border-l-primary]="toast.type === 'info'">
      
      @if (toast.type === 'error') {
        <svg class="w-5 h-5 text-status-dnd flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      } @else if (toast.type === 'success') {
        <svg class="w-5 h-5 text-status-online flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      } @else {
        <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      }

      <p class="text-sm font-bold text-text-normal pr-6">{{ toast.message }}</p>

      <button (click)="toastService.hide()" class="text-text-muted hover:text-text-header transition-colors ml-auto flex-shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

  </div>
}
  `
})
export class ToastComponent {
    toastService = inject(ToastService);
}