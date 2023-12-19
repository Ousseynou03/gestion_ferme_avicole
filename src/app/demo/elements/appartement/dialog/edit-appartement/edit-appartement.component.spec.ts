import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppartementComponent } from './edit-appartement.component';

describe('EditAppartementComponent', () => {
  let component: EditAppartementComponent;
  let fixture: ComponentFixture<EditAppartementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAppartementComponent]
    });
    fixture = TestBed.createComponent(EditAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
