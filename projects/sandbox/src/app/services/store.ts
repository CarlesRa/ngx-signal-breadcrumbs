import { Injectable, signal } from '@angular/core';
import { IconName } from 'ngx-signal-breadcrumbs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _showHome = signal(true);
  private _linkColor = signal('#3b82f6');
  private _linkHoverColor = signal('#93c5fd');
  private _separatorColor = signal('#94a3b8');
  private _separator = signal<IconName>('chevron-right');

  readonly showHome = this._showHome.asReadonly();
  readonly linkColor = this._linkColor.asReadonly();
  readonly linkHoverColor = this._linkHoverColor.asReadonly();
  readonly separatorColor = this._separatorColor.asReadonly();
  readonly separator = this._separator.asReadonly();

  setShowHome(value: boolean): void {
    this._showHome.set(value);
  }

  setLinkColor(value: string): void {
    this._linkColor.set(value);
  }

  setLinkHoverColor(value: string): void {
    this._linkHoverColor.set(value);
  }

  setSeparatorColor(value: string): void {
    this._separatorColor.set(value);
  }

  setSeparator(value: IconName): void {
    this._separator.set(value);
  }

}
