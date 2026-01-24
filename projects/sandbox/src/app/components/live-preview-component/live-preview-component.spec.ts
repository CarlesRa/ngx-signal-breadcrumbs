import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePreviewComponent } from './live-preview-component';

describe('LivePreviewComponent', () => {
  let component: LivePreviewComponent;
  let fixture: ComponentFixture<LivePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivePreviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
