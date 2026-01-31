import { Component, inject, signal } from '@angular/core';
import { SignalBreadcrumbs } from 'ngx-signal-breadcrumbs';
import { CardComponent } from "../shared/card-component/card-component";
import { StoreService } from '../../services/store';
import { DeviceDetector } from '../../services/device-detector';
import { PlaygroundComponent } from '../playground-component/playground-component';

@Component({
  selector: 'app-live-preview',
  imports: [SignalBreadcrumbs, CardComponent, PlaygroundComponent],
  template: `
    <app-card title="Live Preview">
      <div class="preview-area">
        <ngx-signal-breadcrumbs 
          [showHome]="store.showHome()" 
          [linkColor]="store.linkColor()" 
          [linkHoverColor]="store.linkHoverColor()"
          [separatorColor]="store.separatorColor()" 
          [separator]="store.separator()" 
        />
      </div>
      
      @if (deviceDetector.isMobile()) {
        <div class="mobile-controls">
          <button 
            class="toggle-button" 
            (click)="togglePlayground()"
            type="button"
          >
            {{ isPlaygroundOpen() ? 'Hide' : 'Show' }} Playground
            <span class="icon">{{ isPlaygroundOpen() ? '▲' : '▼' }}</span>
          </button>
          
          @if (isPlaygroundOpen()) {
            <div class="playground-container">
              <app-playground />
            </div>
          }
        </div>
      }
    </app-card>
  `,
  styles: `
    .preview-area {
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 1rem;
      background-color: #0f172a;
      border-radius: 0.5rem;
    }

    .mobile-controls {
      margin-top: 1rem;
    }

    .toggle-button {
      width: 100%;
      padding: 0.75rem 1rem;
      background: linear-gradient(to right, #4ade80, #3b82f6);
      color: #0f172a;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: opacity 0.2s;
    }

    .toggle-button:hover {
      opacity: 0.9;
    }

    .toggle-button:active {
      opacity: 0.8;
    }

    .icon {
      font-size: 0.75rem;
      margin-left: 0.5rem;
    }

    .playground-container {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #1e293b;
      border-radius: 0.5rem;
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
})
export class LivePreviewComponent {
  protected store = inject(StoreService);
  protected deviceDetector = inject(DeviceDetector);
  
  isPlaygroundOpen = signal(false);

  togglePlayground(): void {
    this.isPlaygroundOpen.update(value => !value);
  }
}