import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTresorerieComponent } from './edit-tresorerie.component';

describe('EditTresorerieComponent', () => {
  let component: EditTresorerieComponent;
  let fixture: ComponentFixture<EditTresorerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTresorerieComponent]
    });
    fixture = TestBed.createComponent(EditTresorerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
