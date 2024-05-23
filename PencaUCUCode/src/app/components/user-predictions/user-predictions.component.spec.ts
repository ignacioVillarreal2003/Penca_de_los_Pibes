import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPredictionsComponent } from './user-predictions.component';

describe('UserPredictionsComponent', () => {
  let component: UserPredictionsComponent;
  let fixture: ComponentFixture<UserPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPredictionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
