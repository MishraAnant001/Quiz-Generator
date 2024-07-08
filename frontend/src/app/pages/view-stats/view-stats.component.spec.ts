import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatsComponent } from './view-stats.component';

describe('ViewStatsComponent', () => {
  let component: ViewStatsComponent;
  let fixture: ComponentFixture<ViewStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStatsComponent]
    });
    fixture = TestBed.createComponent(ViewStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
