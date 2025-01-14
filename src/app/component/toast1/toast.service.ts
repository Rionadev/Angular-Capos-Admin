import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Define a Toast type with properties such as message, type, and duration
export interface Toast {
  message: string;
  type: string; // e.g., 'success', 'error', 'info', 'warning'
  duration: number; // Duration to display the toast (in milliseconds)
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<Toast>();  // Observable to push toast messages
  toastState$ = this.toastSubject.asObservable();  // Expose observable to components

  constructor() {}

  // Method to show toast notifications
  showToast(message: string, type: string = 'success', duration: number = 3000) {
    const toast: Toast = { message, type, duration };
    this.toastSubject.next(toast); // Push toast to the subject
  }
}
