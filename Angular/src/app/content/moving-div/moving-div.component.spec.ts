import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingDivComponent } from './moving-div.component';

describe('MovingDivComponent', () => {
  let component: MovingDivComponent;
  let fixture: ComponentFixture<MovingDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovingDivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovingDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
