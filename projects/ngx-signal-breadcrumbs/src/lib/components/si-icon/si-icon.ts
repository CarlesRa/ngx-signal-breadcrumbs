import { Component, computed, input } from '@angular/core';
import { IconName, ICON_PATHS } from '../../constants';

@Component({
  selector: 'svg[si-icon]',
  imports: [],
  template: `
    <svg:path
      [attr.d]="info().d"
      [attr.stroke]="info().isSolid ? 'none' : stroke()"
      [attr.fill]="info().isSolid ? 'currentColor' : 'none'"
      [attr.stroke-width]="info().isSolid ? 0 : strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  `,
  host: {
    '[attr.viewBox]': 'info().viewBox',
    '[attr.width]': 'size()',
    '[attr.height]': 'size()',
  }
})
export class SiIcon {
  readonly name = input.required<IconName>({ alias: 'si-icon' });
  readonly size = input<number | string>(20);
  readonly stroke = input<string>('currentColor');
  readonly strokeWidth = input<number>(2);

  protected readonly info = computed(() => ICON_PATHS[this.name()]);
}
