import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocataireComponent } from './edit-locataire.component';

describe('EditLocataireComponent', () => {
  let component: EditLocataireComponent;
  let fixture: ComponentFixture<EditLocataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLocataireComponent]
    });
    fixture = TestBed.createComponent(EditLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
