import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BreadcrumbService } from '.';


describe('BreadcrumbService', () => {
  let service: BreadcrumbService;
  let routerMock: Router;
  let routerEventsSubject: Subject<any>;

  beforeEach(() => {
    routerEventsSubject = new Subject();
    
    routerMock = {
      events: routerEventsSubject.asObservable(),
      routerState: {
        snapshot: {
          root: createMockRoute()
        }
      }
    } as any;

    TestBed.configureTestingModule({
      providers: [
        BreadcrumbService,
        { provide: Router, useValue: routerMock }
      ]
    });
    
    service = TestBed.inject(BreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildBreadcrumbs - basic cases', () => {
    it('should return empty array when no breadcrumbs are defined', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ url: 'home' })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs).toEqual([]);
    });

    it('should return single breadcrumb with static string', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'products', 
            data: { breadcrumb: 'Products' } 
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs.length).toBe(1);
      expect(breadcrumbs[0]).toEqual({
        label: 'Products',
        url: '/products',
        queryParams: {}
      });
    });

    it('should return multiple breadcrumbs with cumulative URLs', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'products', 
            data: { breadcrumb: 'Products' },
            children: [
              createMockRoute({ 
                url: 'laptops', 
                data: { breadcrumb: 'Laptops' } 
              })
            ]
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs.length).toBe(2);
      expect(breadcrumbs[0]).toEqual({
        label: 'Products',
        url: '/products',
        queryParams: {}
      });
      expect(breadcrumbs[1]).toEqual({
        label: 'Laptops',
        url: '/products/laptops',
        queryParams: {}
      });
    });
  });

  describe('buildBreadcrumbs - static vs dynamic', () => {
    it('should use string breadcrumb directly as label', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'about', 
            data: { breadcrumb: 'About Us' } 
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs[0].label).toBe('About Us');
    });

    it('should execute function breadcrumb and use result as label', () => {
      const mockFn = vi.fn().mockReturnValue('Laptop 123');
      const childRoute = createMockRoute({ 
        url: '123', 
        data: { breadcrumb: mockFn },
        params: { id: '123' }
      });
      
      const root = createMockRoute({
        children: [childRoute]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(mockFn).toHaveBeenCalledWith(childRoute);
      expect(breadcrumbs[0].label).toBe('Laptop 123');
    });

    it('should pass correct route snapshot to dynamic breadcrumb function', () => {
      const breadcrumbFn = (route: ActivatedRouteSnapshot) => `Product ${route.params['id']}`;
      const childRoute = createMockRoute({ 
        url: '456', 
        data: { breadcrumb: breadcrumbFn },
        params: { id: '456' }
      });
      
      const root = createMockRoute({
        children: [childRoute]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs[0].label).toBe('Product 456');
    });
  });

  describe('buildBreadcrumbs - null handling', () => {
    it('should skip breadcrumb when explicitly set to null', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'products', 
            data: { breadcrumb: 'Products' },
            children: [
              createMockRoute({ 
                url: '', 
                data: { breadcrumb: null } 
              })
            ]
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs.length).toBe(1);
      expect(breadcrumbs[0].label).toBe('Products');
    });

    it('should skip breadcrumb when undefined', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'home',
            data: { breadcrumb: undefined } 
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs.length).toBe(0);
    });
  });

  describe('buildBreadcrumbs - URL construction', () => {
    it('should handle route without URL segments but with breadcrumb', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: '', 
            data: { breadcrumb: 'Home' } 
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs[0].url).toBe('/');
    });

    it('should concatenate multiple URL segments correctly', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'admin/users/profile', 
            data: { breadcrumb: 'Profile' } 
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs[0].url).toBe('/admin/users/profile');
    });

    it('should handle routes with parameters in URL', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'products', 
            data: { breadcrumb: 'Products' },
            children: [
              createMockRoute({ 
                url: '123', 
                data: { breadcrumb: 'Product Detail' },
                params: { id: '123' }
              })
            ]
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs[1].url).toBe('/products/123');
    });
  });

  describe('buildBreadcrumbs - queryParams', () => {
    it('should include empty queryParams object when none exist', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'search', 
            data: { breadcrumb: 'Search' } 
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs[0].queryParams).toEqual({});
    });

    it('should include queryParams in breadcrumb item', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'search', 
            data: { breadcrumb: 'Search' },
            queryParams: { q: 'laptop', page: '2' }
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs[0].queryParams).toEqual({ q: 'laptop', page: '2' });
    });

    it('should preserve queryParams across multiple levels', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'products', 
            data: { breadcrumb: 'Products' },
            queryParams: { category: 'tech' },
            children: [
              createMockRoute({ 
                url: 'laptops', 
                data: { breadcrumb: 'Laptops' },
                queryParams: { category: 'tech', sort: 'price' }
              })
            ]
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs[0].queryParams).toEqual({ category: 'tech' });
      expect(breadcrumbs[1].queryParams).toEqual({ category: 'tech', sort: 'price' });
    });
  });

  describe('breadcrumbs signal - reactivity', () => {
    it('should update breadcrumbs signal on NavigationEnd event', async () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'home', 
            data: { breadcrumb: 'Home' } 
          })
        ]
      });

      // Update router state
      (routerMock.routerState.snapshot as any).root = root;

      // Emit NavigationEnd
      routerEventsSubject.next(new NavigationEnd(1, '/home', '/home'));

      // Allow async operations to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      const updatedBreadcrumbs = service.breadcrumbs();
      expect(updatedBreadcrumbs.length).toBe(1);
      expect(updatedBreadcrumbs[0].label).toBe('Home');
    });

    it('should not update on non-NavigationEnd events', () => {
      const initialBreadcrumbs = service.breadcrumbs();
      
      // Emit other router events
      routerEventsSubject.next({ type: 'NavigationStart' });
      routerEventsSubject.next({ type: 'RouteConfigLoadStart' });
      
      const breadcrumbs = service.breadcrumbs();
      expect(breadcrumbs).toBe(initialBreadcrumbs);
    });
  });

  describe('edge cases', () => {
    it('should handle deeply nested route tree', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'level1', 
            data: { breadcrumb: 'Level 1' },
            children: [
              createMockRoute({ 
                url: 'level2', 
                data: { breadcrumb: 'Level 2' },
                children: [
                  createMockRoute({ 
                    url: 'level3', 
                    data: { breadcrumb: 'Level 3' },
                    children: [
                      createMockRoute({ 
                        url: 'level4', 
                        data: { breadcrumb: 'Level 4' } 
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs.length).toBe(4);
      expect(breadcrumbs[3].url).toBe('/level1/level2/level3/level4');
    });

    it('should handle route with empty string breadcrumb', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'test', 
            data: { breadcrumb: '' } 
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      // Empty string is falsy, so it should be skipped
      expect(breadcrumbs.length).toBe(0);
    });

    it('should handle mixed null and defined breadcrumbs in chain', () => {
      const root = createMockRoute({
        children: [
          createMockRoute({ 
            url: 'a', 
            data: { breadcrumb: 'A' },
            children: [
              createMockRoute({ 
                url: 'b', 
                data: { breadcrumb: null },
                children: [
                  createMockRoute({ 
                    url: 'c', 
                    data: { breadcrumb: 'C' } 
                  })
                ]
              })
            ]
          })
        ]
      });

      const breadcrumbs = service['buildBreadcrumbs'](root);
      
      expect(breadcrumbs.length).toBe(2);
      expect(breadcrumbs[0].label).toBe('A');
      expect(breadcrumbs[0].url).toBe('/a');
      expect(breadcrumbs[1].label).toBe('C');
      expect(breadcrumbs[1].url).toBe('/a/b/c');
    });
  });
});

// Helper function to create mock ActivatedRouteSnapshot
function createMockRoute(config?: {
  url?: string;
  data?: any;
  params?: any;
  queryParams?: any;
  children?: ActivatedRouteSnapshot[];
}): ActivatedRouteSnapshot {
  const urlSegments = config?.url 
    ? config.url.split('/').filter(Boolean).map(path => ({ path } as any))
    : [];
  
  const mockRoute = {
    url: urlSegments,
    data: config?.data || {},
    params: config?.params || {},
    queryParams: config?.queryParams || {},
    get firstChild() {
      return config?.children && config.children.length > 0 
        ? config.children[0] 
        : null;
    }
  };
  
  return mockRoute as any as ActivatedRouteSnapshot;
}