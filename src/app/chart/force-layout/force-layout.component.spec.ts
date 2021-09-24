import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceLayoutComponent } from './force-layout.component';

describe('ForceLayoutComponent', () => {
  let component: ForceLayoutComponent;
  let fixture: ComponentFixture<ForceLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
