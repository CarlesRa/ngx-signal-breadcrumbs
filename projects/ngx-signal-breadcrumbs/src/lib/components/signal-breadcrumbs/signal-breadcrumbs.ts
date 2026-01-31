import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from '../../services';
import { SiIcon } from '../si-icon/si-icon';
import { IconName } from '../../constants';


@Component({
  selector: 'ngx-signal-breadcrumbs',
  imports: [RouterLink, SiIcon],
  templateUrl: './signal-breadcrumbs.html',
  styleUrl: './signal-breadcrumbs.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalBreadcrumbs {
  showHome = input<boolean>(true);
  linkColor = input<string>('#3b82f6');
  linkHoverColor = input<string>('#93c5fd');
  separatorColor = input<string>('#94a3b8');
  separator = input<IconName>('chevron-right')

  private breadcrumbService = inject(BreadcrumbService);
  protected breadcrumbs = this.breadcrumbService.breadcrumbs
}
