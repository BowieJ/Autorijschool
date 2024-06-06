import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoertuigDialogComponent } from './voertuig-dialog.component';

describe('VoertuigDialogComponent', () => {
  let component: VoertuigDialogComponent;
  let fixture: ComponentFixture<VoertuigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoertuigDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoertuigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
