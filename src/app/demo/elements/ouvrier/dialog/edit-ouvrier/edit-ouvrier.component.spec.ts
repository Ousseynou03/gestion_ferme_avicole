import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOuvrierComponent } from './edit-ouvrier.component';

describe('EditOuvrierComponent', () => {
  let component: EditOuvrierComponent;
  let fixture: ComponentFixture<EditOuvrierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOuvrierComponent]
    });
    fixture = TestBed.createComponent(EditOuvrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
