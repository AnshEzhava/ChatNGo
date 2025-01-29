import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionoptionsComponent } from './sessionoptions.component';

describe('SessionoptionsComponent', () => {
  let component: SessionoptionsComponent;
  let fixture: ComponentFixture<SessionoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionoptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
