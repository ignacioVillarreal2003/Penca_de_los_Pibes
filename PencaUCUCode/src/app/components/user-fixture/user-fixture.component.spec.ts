import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFixtureComponent } from './user-fixture.component';

describe('UserFixtureComponent', () => {
  let component: UserFixtureComponent;
  let fixture: ComponentFixture<UserFixtureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFixtureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
