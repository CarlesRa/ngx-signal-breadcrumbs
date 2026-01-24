import { Component, input } from '@angular/core';

@Component({
  selector: 'app-control',
  imports: [],
  template: `
    <div class="control">
      @if(label()) {
        <label [for]="controlId()">{{ label() }}</label>
      }
      <ng-content />
    </div>
  `,
  styles: `
    .control {
      display: flex;
      flex-direction: column;
      transition: background-color 0.2s;
      padding: .4rem;
    }

    .control:hover {
      background-color: #334155;
      border-radius: 0.375rem;
    }

    .control label {
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: #cbd5e1;
    }
  `,
})
export class ControlComponent {
  label = input<string>();
  controlId = input.required<string>();
}
