import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatimentComponent } from './edit-batiment.component';

describe('EditBatimentComponent', () => {
  let component: EditBatimentComponent;
  let fixture: ComponentFixture<EditBatimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBatimentComponent]
    });
    fixture = TestBed.createComponent(EditBatimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
