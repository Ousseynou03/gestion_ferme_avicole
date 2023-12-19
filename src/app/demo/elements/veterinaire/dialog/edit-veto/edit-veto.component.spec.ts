import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVetoComponent } from './edit-veto.component';

describe('EditVetoComponent', () => {
  let component: EditVetoComponent;
  let fixture: ComponentFixture<EditVetoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVetoComponent]
    });
    fixture = TestBed.createComponent(EditVetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
