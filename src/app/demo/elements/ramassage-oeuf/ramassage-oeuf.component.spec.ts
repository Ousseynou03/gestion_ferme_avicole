import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamassageOeufComponent } from './ramassage-oeuf.component';

describe('RamassageOeufComponent', () => {
  let component: RamassageOeufComponent;
  let fixture: ComponentFixture<RamassageOeufComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RamassageOeufComponent]
    });
    fixture = TestBed.createComponent(RamassageOeufComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
