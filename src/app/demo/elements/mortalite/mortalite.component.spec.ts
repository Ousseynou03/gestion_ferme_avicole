import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortaliteComponent } from './mortalite.component';

describe('MortaliteComponent', () => {
  let component: MortaliteComponent;
  let fixture: ComponentFixture<MortaliteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MortaliteComponent]
    });
    fixture = TestBed.createComponent(MortaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
