import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesLayoutComponent } from './pages-layout.component';

describe('PagesLayoutComponent', () => {
  let component: PagesLayoutComponent;
  let fixture: ComponentFixture<PagesLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesLayoutComponent]
    });
    fixture = TestBed.createComponent(PagesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
