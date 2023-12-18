import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaterielComponent } from './edit-materiel.component';

describe('EditMaterielComponent', () => {
  let component: EditMaterielComponent;
  let fixture: ComponentFixture<EditMaterielComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaterielComponent]
    });
    fixture = TestBed.createComponent(EditMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
