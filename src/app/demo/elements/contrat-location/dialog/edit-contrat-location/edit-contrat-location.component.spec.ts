import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContratLocationComponent } from './edit-contrat-location.component';

describe('EditContratLocationComponent', () => {
  let component: EditContratLocationComponent;
  let fixture: ComponentFixture<EditContratLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContratLocationComponent]
    });
    fixture = TestBed.createComponent(EditContratLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
