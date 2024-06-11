import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Component decorator met configuratie-informatie
@Component({
  selector: 'app-notificatie-dialog',
  standalone: true, // Dit geeft aan dat de component zelfstandig gebruikt kan worden
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule], // Importeren van benodigde Angular modules
  templateUrl: './notificatie-dialog.component.html', // Template voor de HTML structuur
  styleUrls: ['./notificatie-dialog.component.scss'] // Stijlen voor dit component
})
export class NotificatieDialogComponent {
  // Constructor met injectie van MatDialogRef en MAT_DIALOG_DATA
  constructor(
      public dialogRef: MatDialogRef<NotificatieDialogComponent>, // Referentie naar de geopende dialoog
      @Inject(MAT_DIALOG_DATA) public data: { titel: string, tekst: string } // Injectie van data object, met 'titel' en 'tekst'
  ) {}

  // Methode die wordt aangeroepen wanneer de gebruiker de dialoog wil sluiten zonder wijzigingen op te slaan
  onNoClick(): void {
    this.dialogRef.close(); // Sluit de dialoog zonder data terug te geven
  }
}
