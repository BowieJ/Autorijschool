import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Voertuigen } from '../voertuigen';
import { VoertuigService } from '../voertuigen.service';
import { NotificatieDialogComponent } from '../notificatie-dialog/notificatie-dialog.component';
import { VoltooiDialogComponent } from '../voltooi-dialog/voltooi-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InformatieComponent } from '../informatie/informatie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    InformatieComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  naam!: string; // Naam van de klant
  telefoon!: string; // Telefoonnummer van de klant
  datum!: string; // Datum van de afspraak
  tijd!: string; // Tijd van de afspraak
  gekozenVoertuig!: Voertuigen; // Gekozen voertuig voor de afspraak
  beschikbareVoertuigen: Voertuigen[]; // Lijst van beschikbare voertuigen
  gemaakteAfspraken: any[] = []; // Lijst van gemaakte afspraken
  beschikbareTijden: string[] = []; // Lijst van beschikbare tijden op een dag
  notificaties: { titel: string, tekst: string }[] = []; // Lijst van notificaties
  instructeurs: string[] = ['Instructeur 1', 'Instructeur 2', 'Instructeur 3']; // Lijst van instructeurs
  ophaallocatie!: string; // Ophaallocatie voor de les
  doelLes!: string; // Doel van de les

  constructor(private voertuigService: VoertuigService, public dialog: MatDialog) {
    // Verkrijg de lijst van beschikbare voertuigen bij initialisatie
    this.beschikbareVoertuigen = this.voertuigService.getBeschikbareVoertuigen();
  }

  ngOnInit(): void {
    // Laad gemaakte afspraken en notificaties uit de local storage bij initialisatie
    const opgeslagenAfspraken = localStorage.getItem('afspraken');
    if (opgeslagenAfspraken) {
      this.gemaakteAfspraken = JSON.parse(opgeslagenAfspraken);
    }

    const opgeslagenNotificaties = localStorage.getItem('notificaties');
    if (opgeslagenNotificaties) {
      this.notificaties = JSON.parse(opgeslagenNotificaties);
    }

    // Update de beschikbare tijden
    this.updateBeschikbareTijden();
  }

  // Update de lijst van beschikbare tijden voor de geselecteerde datum
  updateBeschikbareTijden(): void {
    const now = new Date();
    const selectedDate = new Date(this.datum);
    this.beschikbareTijden = [];

    // Als de geselecteerde datum vandaag is, toon alleen resterende uren
    if (selectedDate.toDateString() === now.toDateString()) {
      const currentHour = now.getHours();
      for (let i = currentHour + 1; i <= 17; i++) {
        if (i >= 9 && i <= 17) {
          this.beschikbareTijden.push(this.formatTime(i));
        }
      }
    } else {
      // Toon volledige uren tussen 9:00 en 17:00
      for (let i = 9; i <= 17; i++) {
        this.beschikbareTijden.push(this.formatTime(i));
      }
    }
  }

  // Format een uur naar een string in HH:MM formaat
  formatTime(hour: number): string {
    return hour.toString().padStart(2, '0') + ':00';
  }

  // Valideer of de geselecteerde datum in de toekomst ligt en op een werkdag valt
  validateDate(): boolean {
    const datum = new Date(this.datum);
    const vandaag = new Date();
    vandaag.setHours(0, 0, 0, 0);

    if (datum < vandaag) {
      alert("Kies een datum in de toekomst.");
      return false;
    }

    const dag = datum.getUTCDay();
    if (dag < 1 || dag > 5) {
      alert("Kies een datum tussen maandag en vrijdag.");
      return false;
    }

    return true;
  }

  // Valideer of de geselecteerde tijd binnen de werkuren valt
  validateDateTime(): boolean {
    if (!this.validateDate()) {
      return false;
    }

    const tijdParts = this.tijd.split(':');
    const uur = parseInt(tijdParts[0], 10);
    if (uur < 9 || uur > 17) {
      alert("Kies een tijd tussen 9:00 en 17:00.");
      return false;
    }

    return true;
  }

  // Maak een nieuwe afspraak aan en sla deze op in de local storage
  maakAfspraak(event: Event): void {
    event.preventDefault();
    if (!this.validateDateTime()) {
      return;
    }

    const nieuweAfspraak = {
      naam: this.naam,
      telefoon: this.telefoon,
      datumTijd: new Date(`${this.datum}T${this.tijd}`),
      voertuig: this.gekozenVoertuig,
      ophaallocatie: this.ophaallocatie,
      doelLes: this.doelLes,
      instructeur: this.instructeurs,
      voltooid: false,
      feedback: ''
    };

    this.gemaakteAfspraken.push(nieuweAfspraak);
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
    console.log("Nieuwe afspraak aangemaakt:", nieuweAfspraak);
  }

  // Verwijder een afspraak uit de lijst en update de local storage
  verwijderAfspraak(index: number): void {
    this.gemaakteAfspraken.splice(index, 1);
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
  }

  // Markeer een afspraak als voltooid en update de local storage
  markeerAlsVoltooid(index: number): void {
    this.gemaakteAfspraken[index].voltooid = true;
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
  }

  // Open een dialog om de afspraak als voltooid te markeren en feedback toe te voegen
  openVoltooiDialog(index: number): void {
    const afspraak = this.gemaakteAfspraken[index];
    const dialogRef = this.dialog.open(VoltooiDialogComponent, {
      width: '400px',
      data: { feedback: afspraak.feedback, voltooid: afspraak.voltooid }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gemaakteAfspraken[index].feedback = result.feedback;
        this.gemaakteAfspraken[index].voltooid = result.voltooid;
        localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
      }
    });
  }

  // Open een dialog om een nieuwe notificatie toe te voegen of een bestaande te bewerken
  openNotificatieDialog(notificatie?: any, index?: number): void {
    const dialogRef = this.dialog.open(NotificatieDialogComponent, {
      width: '400px',
      data: notificatie ? { ...notificatie } : { titel: '', tekst: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (index !== undefined) {
          this.notificaties[index] = result;
        } else {
          this.notificaties.push(result);
        }
        localStorage.setItem('notificaties', JSON.stringify(this.notificaties));
      }
    });
  }

  // Verwijder een notificatie uit de lijst en update de local storage
  verwijderNotificatie(index: number): void {
    this.notificaties.splice(index, 1);
    localStorage.setItem('notificaties', JSON.stringify(this.notificaties));
  }
}
