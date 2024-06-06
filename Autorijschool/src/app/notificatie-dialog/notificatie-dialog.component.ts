import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Notificatie {
  id: number;
  bericht: string;
}

@Component({
  selector: 'app-notificatie-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notificatie-dialog.component.html',
  styleUrls: ['./notificatie-dialog.component.scss']
})
export class NotificatieDialogComponent {
  notificatie: Notificatie;

  constructor(
    public dialogRef: MatDialogRef<NotificatieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notificatie
  ) {
    this.notificatie = { ...data }; // Maak een kopie van de data om te bewerken
  }

  notificatieOpslaan(): void {
    this.dialogRef.close(this.notificatie); // Sluit de dialoog en geef de gewijzigde notificatie terug
  }
}
