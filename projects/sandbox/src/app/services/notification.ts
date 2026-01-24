import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message = signal<string | null>(null);

  show(message: string, duration = 2000): void {
    console.log('Showing notification:', message);
    this.message.set(message);
    setTimeout(() => this.message.set(null), duration);
  }
}
