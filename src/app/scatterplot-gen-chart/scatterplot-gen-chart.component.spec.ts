import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterplotGenChartComponent } from './scatterplot-gen-chart.component';

describe('ScatterplotGenChartComponent', () => {
  let component: ScatterplotGenChartComponent;
  let fixture: ComponentFixture<ScatterplotGenChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterplotGenChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterplotGenChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
