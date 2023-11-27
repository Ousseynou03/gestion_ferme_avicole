import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeufComponent } from './oeuf.component';

describe('OeufComponent', () => {
  let component: OeufComponent;
  let fixture: ComponentFixture<OeufComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OeufComponent]
    });
    fixture = TestBed.createComponent(OeufComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
