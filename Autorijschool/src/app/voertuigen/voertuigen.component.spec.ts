import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoertuigenComponent } from './voertuigen.component';

describe('VoertuigenComponent', () => {
  let component: VoertuigenComponent;
  let fixture: ComponentFixture<VoertuigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoertuigenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoertuigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
