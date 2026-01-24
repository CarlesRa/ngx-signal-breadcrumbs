import { Component, input } from '@angular/core';

@Component({
  selector: 'app-code-block',
  imports: [],
  template: `
  <pre><code class="code-block"><ng-content /></code></pre>
  `,
  styles: `
    .code-block {
      display: block;
      padding: 1rem;
      background-color: #0f172a;
      color: #cbd5e1;
      border-radius: 0.5rem;
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.875rem;
      white-space: pre-wrap;
      border: 1px solid #334155;
      width: 100%; /* Ensure it takes full width */
      box-sizing: border-box; /* Include padding and border in the element's total width and height */
      overflow-x: auto; /* Allow horizontal scrolling if content overflows */
    }
  `,
})
export class CodeBlockComponent {
  codeBlockId = input.required();
}
