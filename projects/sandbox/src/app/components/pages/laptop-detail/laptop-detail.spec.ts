import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopDetail } from './laptop-detail';

describe('LaptopDetail', () => {
  let component: LaptopDetail;
  let fixture: ComponentFixture<LaptopDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaptopDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaptopDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
