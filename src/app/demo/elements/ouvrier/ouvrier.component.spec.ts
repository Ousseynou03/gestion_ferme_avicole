import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvrierComponent } from './ouvrier.component';

describe('OuvrierComponent', () => {
  let component: OuvrierComponent;
  let fixture: ComponentFixture<OuvrierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OuvrierComponent]
    });
    fixture = TestBed.createComponent(OuvrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
