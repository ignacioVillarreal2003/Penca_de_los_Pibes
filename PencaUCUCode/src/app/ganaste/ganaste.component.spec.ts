import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanasteComponent } from './ganaste.component';

describe('GanasteComponent', () => {
  let component: GanasteComponent;
  let fixture: ComponentFixture<GanasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanasteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GanasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
