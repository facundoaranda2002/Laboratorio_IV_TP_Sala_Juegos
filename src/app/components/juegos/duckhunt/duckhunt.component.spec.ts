import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuckhuntComponent } from './duckhunt.component';

describe('DuckhuntComponent', () => {
  let component: DuckhuntComponent;
  let fixture: ComponentFixture<DuckhuntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuckhuntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuckhuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
