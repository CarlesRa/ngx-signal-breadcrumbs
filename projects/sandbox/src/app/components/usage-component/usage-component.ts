import { Component } from '@angular/core';
import { CardComponent } from "../shared/card-component/card-component";
import { CodeBlockComponent } from "../shared/code-block/code-block";

@Component({
  selector: 'app-usage',
  imports: [CardComponent, CodeBlockComponent],
  template: `
    <app-card title="Usage">
      <p>Import and add the component to your template:</p>
      <app-code-block codeBlockId="library-name">
        &lt;ngx-signal-breadcrumbs /&gt;
      </app-code-block>

      <p>Customize it with the available inputs:</p>
      <app-code-block codeBlockId="component-example">
        &lt;ngx-signal-breadcrumbs
          [linkColor]="'#3b82f6'"
          [linkHoverColor]="'#93c5fd'"
          separator="slash" /&gt;
      </app-code-block>
    </app-card>
  `,
  styles: ``,
})
export class UsageComponent {

}
