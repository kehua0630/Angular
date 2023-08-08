import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyAndLockComponent } from './copy-and-lock.component';

describe('CopyAndLockComponent', () => {
  let component: CopyAndLockComponent;
  let fixture: ComponentFixture<CopyAndLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyAndLockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyAndLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
