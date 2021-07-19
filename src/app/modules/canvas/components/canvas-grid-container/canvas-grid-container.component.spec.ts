import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasGridContainerComponent } from './canvas-grid-container.component';

describe('CanvasGridContainerComponent', () => {
  let component: CanvasGridContainerComponent;
  let fixture: ComponentFixture<CanvasGridContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasGridContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasGridContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
