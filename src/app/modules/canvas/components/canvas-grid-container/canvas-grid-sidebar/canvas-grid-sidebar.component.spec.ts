import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasGridSidebarComponent } from './canvas-grid-sidebar.component';

describe('CanvasGridSidebarComponent', () => {
  let component: CanvasGridSidebarComponent;
  let fixture: ComponentFixture<CanvasGridSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasGridSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasGridSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
