import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQuestionComponent } from './get-question.component';

describe('GetQuestionComponent', () => {
  let component: GetQuestionComponent;
  let fixture: ComponentFixture<GetQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetQuestionComponent]
    });
    fixture = TestBed.createComponent(GetQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
