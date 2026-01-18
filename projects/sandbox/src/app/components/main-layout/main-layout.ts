import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SignalBreadcrumbs, IconName, ICON_PATHS } from 'ngx-signal-breadcrumbs';


@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SignalBreadcrumbs],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  // All separators available
  separators: IconName[] = (Object.keys(ICON_PATHS) as IconName[])
    .filter(icon => icon !== 'home');

  // Signals for all inputs
  showHome = signal(true);
  linkColor = signal('#3b82f6');
  linkHoverColor = signal('#93c5fd');
  separatorColor = signal('#94a3b8');
  separator = signal<IconName>('chevron-right');

  // Signal for notification message
  notificationMessage = signal<string | null>(null);

  setSeparator(separator: IconName): void {
    this.separator.set(separator);
  }

  async copyToClipboard(elementId: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (element && element.textContent) {
      try {
        await navigator.clipboard.writeText(element.textContent);
        console.log('Copied to clipboard:', element.textContent);
        this.showNotification('Text copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text:', err);
        this.fallbackCopyToClipboard(element.textContent);
        this.showNotification('Failed to copy text (fallback used)!');
      }
    }
  }

  private fallbackCopyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      console.log('Fallback: Copied to clipboard:', text);
    } catch (err) {
      console.error('Fallback: Failed to copy text:', err);
    }

    document.body.removeChild(textArea);
  }

  private showNotification(message: string): void {
    this.notificationMessage.set(message);
    setTimeout(() => {
      this.notificationMessage.set(null);
    }, 2000); // Notification disappears after 2 seconds
  }

}
