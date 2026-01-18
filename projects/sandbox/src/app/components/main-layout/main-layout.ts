import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SignalBreadcrumbs, IconName } from 'ngx-signal-breadcrumbs';


@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SignalBreadcrumbs],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  // All separators available
  separators: IconName[] = ['chevron-right', 'arrow-right', 'dot', 'slash', 'pipe'];

  // Signals for all inputs
  showHome = signal(true);
  linkColor = signal('#3b82f6');
  linkHoverColor = signal('#93c5fd');
  separatorColor = signal('#94a3b8');
  currentWeight = signal('500');
  separator = signal<IconName>('chevron-right');

  setSeparator(separator: IconName): void {
    this.separator.set(separator);
  }
}
