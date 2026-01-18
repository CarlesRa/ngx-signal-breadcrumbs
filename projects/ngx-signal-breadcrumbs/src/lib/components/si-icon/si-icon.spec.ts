import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiIcon } from './si-icon';
import { ICON_PATHS } from '../../constants';

describe('SiIcon', () => {
  let component: SiIcon;
  let fixture: ComponentFixture<SiIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiIcon]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SiIcon);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('si-icon', 'home');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render svg path for the given icon', () => {
    const path = fixture.nativeElement.querySelector('path');

    expect(path).toBeTruthy();
    expect(path.getAttribute('d')).toBe(ICON_PATHS.home.d);
  });
});
