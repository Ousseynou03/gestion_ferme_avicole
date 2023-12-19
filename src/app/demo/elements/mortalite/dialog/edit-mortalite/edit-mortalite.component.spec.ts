import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMortaliteComponent } from './edit-mortalite.component';

describe('EditMortaliteComponent', () => {
  let component: EditMortaliteComponent;
  let fixture: ComponentFixture<EditMortaliteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMortaliteComponent]
    });
    fixture = TestBed.createComponent(EditMortaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
