import { computed, inject, Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { BreadcrumbItem, BreadcrumbLabel } from '../models';
import { BREADCRUMB_KEY } from '../constants';


@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  /** Angular Router instance injected */
  private readonly router = inject(Router);

  /**
   * Signal that tracks NavigationEnd events from the router.
   *
   * This signal is used as a reactive trigger for the `breadcrumbs` computed.
   * Calling `this.navigationEnd()` registers the dependency so that
   * `breadcrumbs` recomputes on every navigation.
   */
  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
  );

  /**
   * Computed signal that returns the current list of breadcrumbs.
   *
   * This signal automatically updates whenever a NavigationEnd event occurs,
   * thanks to the dependency on `navigationEnd()`.
   *
   * @returns Array of `BreadcrumbItem` representing the current navigation hierarchy.
   */
  readonly breadcrumbs = computed(() => {
    // Trigger the computed to re-evaluate on each navigation end event
    this.navigationEnd();

    // Build the breadcrumb trail starting from the root of the router state
    return this.buildBreadcrumbs(this.router.routerState.snapshot.root);
  });

  /**
   * Builds the breadcrumb items from the current route snapshot tree.
   *
   * Iterates through the `firstChild` chain of the route snapshot,
   * concatenates the URL segments, and includes only routes
   * that define a breadcrumb in their route data.
   *
   * @param route Root route snapshot to start building breadcrumbs from
   * @returns Array of `BreadcrumbItem` representing the navigation hierarchy
   */
  private buildBreadcrumbs(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [];
    let url = '';

    for (let currentRoute = route.firstChild; currentRoute; currentRoute = currentRoute.firstChild) {

      const routeURL = currentRoute.url.map(s => s.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      const breadcrumb = currentRoute.data[BREADCRUMB_KEY] as BreadcrumbLabel | undefined;
      if (breadcrumb) {
        // Support static string or dynamic breadcrumb resolver
        const label =
          typeof breadcrumb === 'function'
            ? breadcrumb(currentRoute)
            : breadcrumb;

        breadcrumbs.push({
          label,
          url: url || '/',
          queryParams: currentRoute.queryParams,
        });
      }
    }

    return breadcrumbs;
  }
}
