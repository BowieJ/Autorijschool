import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoltooiDialogComponent } from './voltooi-dialog.component';

describe('VoltooiDialogComponent', () => {
  let component: VoltooiDialogComponent;
  let fixture: ComponentFixture<VoltooiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoltooiDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoltooiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
