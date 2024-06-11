import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Component decorator met configuratie-informatie
@Component({
  selector: 'app-voltooi-dialog',
  standalone: true, // Geeft aan dat deze component op zichzelf staand kan zijn
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule // Voor het toevoegen van een checkbox in de dialoog
  ],
  templateUrl: './voltooi-dialog.component.html', // Template voor de HTML structuur
  styleUrls: ['./voltooi-dialog.component.scss'] // Stijlen voor dit component
})
export class VoltooiDialogComponent {
  // Constructor met injectie van MatDialogRef en MAT_DIALOG_DATA
  constructor(
      public dialogRef: MatDialogRef<VoltooiDialogComponent>, // Referentie naar de dialoog om deze te kunnen sluiten en data terug te sturen
      @Inject(MAT_DIALOG_DATA) public data: { feedback: string, voltooid: boolean } // Injectie van data object, met 'feedback' en 'voltooid'
  ) {}

  // Methode die wordt aangeroepen wanneer de gebruiker de dialoog wil sluiten zonder wijzigingen op te slaan
  onNoClick(): void {
    this.dialogRef.close(); // Sluit de dialoog zonder data terug te sturen
  }
}
