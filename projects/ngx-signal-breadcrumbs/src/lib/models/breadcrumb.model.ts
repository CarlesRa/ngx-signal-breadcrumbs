import { ActivatedRouteSnapshot, Params } from "@angular/router";

export type BreadcrumbLabel =
  | string
  | ((route: ActivatedRouteSnapshot) => string);

export interface BreadcrumbItem {
  label: string;
  url: string;
  queryParams: Params;
}