import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notificatie-dialog',
  template: `
    <h1 mat-dialog-title>Notificatie</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Titel</mat-label>
        <input matInput [(ngModel)]="data.titel">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Tekst</mat-label>
        <textarea matInput [(ngModel)]="data.tekst"></textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Annuleren</button>
      <button mat-button (click)="onSave()">Opslaan</button>
    </div>
  `
})
export class NotificatieDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NotificatieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titel: string, tekst: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
