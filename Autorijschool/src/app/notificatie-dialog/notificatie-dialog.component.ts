import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notificatie-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notificatie-dialog.component.html',
  styleUrls: ['./notificatie-dialog.component.scss']
})
export class NotificatieDialogComponent {
  titel: string = '';
  tekst: string = '';

  constructor(public dialogRef: MatDialogRef<NotificatieDialogComponent>) {}

  notificatieOpslaan(): void {
    this.dialogRef.close({ titel: this.titel, tekst: this.tekst });
  }
}
