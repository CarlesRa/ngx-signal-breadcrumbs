import { Component, inject, signal } from '@angular/core';
import { CardComponent } from "../shared/card-component/card-component";
import { CodeBlockComponent } from "../shared/code-block/code-block";
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-installation',
  imports: [CardComponent, CodeBlockComponent],
  template: `
   <app-card title="Installation">
      <p>Install the library via npm:</p>
      <app-code-block codeBlockId="install-command">
        <div class="code-block-container">
          <span id="npm-install-command">npm install ngx-signal-breadcrumbs</span>
          <button class="copy-button" (click)="copyToClipboard('npm-install-command')">Copy</button>
        </div>
      </app-code-block>
    </app-card>
  `,
  styles: `
    .code-block-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
    }
    .copy-button {
      background-color: #334155;
      color: #e2e8f0;
      border: none;
      padding: 0.4rem 0.8rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.75rem;
      transition: background-color 0.2s, color 0.2s;
    }

    .copy-button:hover {
      background-color: #475569;
      color: #ffffff;
    }

    .copy-button:active {
      background-color: #3b82f6;
      color: #0f172a;
    }
  `,
})
export class InstallationComponent {
  notificationService = inject(NotificationService);

  async copyToClipboard(elementId: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (element && element.textContent) {
      try {
        await navigator.clipboard.writeText(element.textContent.trim());
        this.notificationService.show('Text copied to clipboard!');
      } catch (err) {
        this.notificationService.show('Text copied to clipboard!');
      }
    }
  }
}
