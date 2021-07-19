import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapePropertiesPanelComponent } from './shape-properties-panel.component';

describe('ShapePropertiesPanelComponent', () => {
  let component: ShapePropertiesPanelComponent;
  let fixture: ComponentFixture<ShapePropertiesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapePropertiesPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapePropertiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
