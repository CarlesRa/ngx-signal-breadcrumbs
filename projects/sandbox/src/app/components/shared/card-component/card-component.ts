import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
    <div class="card">
      <h2 class="card-title">{{ title() }}</h2>
      <ng-content />
    </div>
  `,
  styles: `
  .card {
    background-color: #1e293b;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #334155;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid #334155;
    padding-bottom: 0.75rem;
  }
  `,
})
export class CardComponent {
  title = input<string>();
}
