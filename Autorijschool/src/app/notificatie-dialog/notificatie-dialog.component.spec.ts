import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificatieDialogComponent } from './notificatie-dialog.component';

describe('NotificatieDialogComponent', () => {
  let component: NotificatieDialogComponent;
  let fixture: ComponentFixture<NotificatieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificatieDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificatieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
