import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrhomeComponent } from './hrhome.component';

describe('HrhomeComponent', () => {
  let component: HrhomeComponent;
  let fixture: ComponentFixture<HrhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrhomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
