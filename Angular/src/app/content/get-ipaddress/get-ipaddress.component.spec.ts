import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetIPAddressComponent } from './get-ipaddress.component';

describe('GetIPAddressComponent', () => {
  let component: GetIPAddressComponent;
  let fixture: ComponentFixture<GetIPAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetIPAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetIPAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
