import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNutritionComponent } from './edit-nutrition.component';

describe('EditNutritionComponent', () => {
  let component: EditNutritionComponent;
  let fixture: ComponentFixture<EditNutritionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNutritionComponent]
    });
    fixture = TestBed.createComponent(EditNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
