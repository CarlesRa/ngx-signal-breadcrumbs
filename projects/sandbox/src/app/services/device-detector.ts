import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetector {
  private _isMobile = signal(false);

  isMobile = this._isMobile.asReadonly();

  private readonly destroyRef = inject(DestroyRef);
  private readonly breakPointObserver = inject(BreakpointObserver);

  constructor() {
    this.observeChanges();
  }

  private observeChanges(): void {
    this.breakPointObserver.observe(
      [Breakpoints.Handset, Breakpoints.XSmall]
    ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      this._isMobile.set(result.matches);
    });
  }
}
