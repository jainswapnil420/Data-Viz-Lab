import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterWithShapesComponent } from './scatter-with-shapes.component';

describe('ScatterWithShapesComponent', () => {
  let component: ScatterWithShapesComponent;
  let fixture: ComponentFixture<ScatterWithShapesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterWithShapesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterWithShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
