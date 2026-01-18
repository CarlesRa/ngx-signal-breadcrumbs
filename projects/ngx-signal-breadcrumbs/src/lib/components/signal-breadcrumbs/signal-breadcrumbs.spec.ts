import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { SignalBreadcrumbs } from './signal-breadcrumbs';
import { BreadcrumbService } from '../../services';

describe('SignalBreadcrumbs', () => {
  let component: SignalBreadcrumbs;
  let fixture: ComponentFixture<SignalBreadcrumbs>;

  const breadcrumbsSignal = signal([
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Detail' },
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalBreadcrumbs],
      providers: [
        provideRouter([]),
        {
          provide: BreadcrumbService,
          useValue: {
            breadcrumbs: breadcrumbsSignal,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalBreadcrumbs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component['showHome']()).toBe(true);
    expect(component['linkColor']()).toBe('#3b82f6');
    expect(component['separatorColor']()).toBe('#94a3b8');
    expect(component['separator']()).toBe('chevron-right');
  });

  it('should render home icon when showHome is true', () => {
    const homeLink = fixture.nativeElement.querySelector('a[routerLink="/"]');
    expect(homeLink).toBeTruthy();
  });

  it('should not render home icon when showHome is false', () => {
    fixture.componentRef.setInput('showHome', false);
    fixture.detectChanges();

    const homeLink = fixture.nativeElement.querySelector('a[routerLink="/"]');
    expect(homeLink).toBeFalsy();
  });

  it('should render last breadcrumb as current page', () => {
    const current = fixture.nativeElement.querySelector(
      'span.current[aria-current="page"]'
    );

    expect(current).toBeTruthy();
    expect(current.textContent).toContain('Detail');

    const lastLink = Array.from(
      fixture.nativeElement.querySelectorAll('a')
    ).find((a) => (a as HTMLAnchorElement).textContent?.includes('Detail'));

    expect(lastLink).toBeUndefined();
  });

  it('should expose breadcrumbs from BreadcrumbService', () => {
    const breadcrumbs = component['breadcrumbs']();

    expect(breadcrumbs.length).toBe(3);
    expect(breadcrumbs[0].label).toBe('Home');
    expect(breadcrumbs[1].label).toBe('Products');
  });

  it('should render breadcrumb labels in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Home');
    expect(compiled.textContent).toContain('Products');
    expect(compiled.textContent).toContain('Detail');
  });
});
