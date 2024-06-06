import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Voertuigen } from '../voertuigen';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voertuig-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voertuig-dialog.component.html',
  styleUrls: ['./voertuig-dialog.component.scss']
})
export class VoertuigDialogComponent {
  voertuig: Voertuigen;

  constructor(
    public dialogRef: MatDialogRef<VoertuigDialogComponent>, // Referentie naar de dialoog
    @Inject(MAT_DIALOG_DATA) public data: Voertuigen // Geïnjecteerde data voor het voertuig
  ) {
    // Maak een kopie van de data om te bewerken
    this.voertuig = { ...data };
  }

  // Functie die wordt aangeroepen wanneer een bestand is geselecteerd
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0]; // Haal het geselecteerde bestand op
    const reader = new FileReader();

    // Callback voor wanneer het bestand is gelezen
    reader.onload = (e: any) => {
      this.voertuig.fotoUrl = e.target.result; // Zet de gelezen gegevens als fotoUrl
    };

    reader.readAsDataURL(file); // Lees het bestand als Data URL
  }

  // Functie om het voertuig op te slaan en de dialoog te sluiten
  voertuigOpslaan(): void {
    this.dialogRef.close(this.voertuig); // Sluit de dialoog en geef de gewijzigde voertuiggegevens terug
  }
}
