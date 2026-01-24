import { Component, inject } from '@angular/core';
import { SignalBreadcrumbs } from 'ngx-signal-breadcrumbs';
import { CardComponent } from "../shared/card-component/card-component";
import { StoreService } from '../../services/store';

@Component({
  selector: 'app-live-preview',
  imports: [SignalBreadcrumbs, CardComponent],
  template: `
    <app-card title="Live Preview">
      <div class="preview-area">
        <ngx-signal-breadcrumbs [showHome]="store.showHome()" [linkColor]="store.linkColor()" [linkHoverColor]="store.linkHoverColor()"
          [separatorColor]="store.separatorColor()" [separator]="store.separator()" />
      </div>
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
  `,
})
export class LivePreviewComponent {
  store = inject(StoreService);
}
