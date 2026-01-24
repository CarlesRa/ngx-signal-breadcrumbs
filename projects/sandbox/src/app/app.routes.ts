import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { MainLayout } from './components/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        title: 'Home',
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(mod => mod.Home),
      },
      {
        title: 'Products',
        path: 'products',
        data: {
          breadcrumb: 'Products'
        },
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/products/products').then(mod => mod.Products),
            data: {
              breadcrumb: null
            }
          },
          {
            title: 'Laptops',
            path: 'laptops',            
            data: {
              breadcrumb: 'Laptops'
            }, children: [
              {
                path: '',
                loadComponent: () => import('./pages/laptops/laptops').then(mod => mod.Laptops),
                data: {
                  breadcrumb: null
                }
              },
              {
                title: 'Laptop information',
                path: ':id',
                loadComponent: () => import('./pages/laptop-detail/laptop-detail').then(mod => mod.LaptopDetail),
                data: {
                  breadcrumb: (route: ActivatedRouteSnapshot) => {
                    const id = route.params['id'] as string;
                    return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                  }
                }
              }
            ]
          },
        ]
      },
      {
        path: '', pathMatch: 'full', redirectTo: 'home'
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];
