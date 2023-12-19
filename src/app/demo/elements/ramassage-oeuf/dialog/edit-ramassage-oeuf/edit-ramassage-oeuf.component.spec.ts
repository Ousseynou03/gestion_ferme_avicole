import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRamassageOeufComponent } from './edit-ramassage-oeuf.component';

describe('EditRamassageOeufComponent', () => {
  let component: EditRamassageOeufComponent;
  let fixture: ComponentFixture<EditRamassageOeufComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRamassageOeufComponent]
    });
    fixture = TestBed.createComponent(EditRamassageOeufComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
