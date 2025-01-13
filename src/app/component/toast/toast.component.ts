import { Component, OnInit } from '@angular/core';
import { ToastService, Toast } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    // Subscribe to the toast observable to receive new toast messages
    this.toastService.toastState$.subscribe((toast) => {
      this.toasts.push(toast); // Add new toast to the list
      setTimeout(() => {
        this.removeToast(toast); // Remove toast after its duration
      }, toast.duration);
    });
  }

  // Method to remove the toast from the list
  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}