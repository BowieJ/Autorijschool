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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {InformatieComponent} from "../informatie/informatie.component";

// Component decorator met configuratie-informatie
@Component({
  selector: 'app-home',
  standalone: true, // Dit moet true zijn voor standalone componenten
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    InformatieComponent // Dit is een andere component die gebruikt wordt
  ],
  templateUrl: './home.component.html', // Template voor de HTML structuur
  styleUrls: ['./home.component.scss'] // Stijlen voor dit component
})
export class HomeComponent implements OnInit {
  // Declaratie van variabelen
  naam!: string;
  telefoon!: string;
  datum!: string;
  tijd!: string;
  gekozenVoertuig!: Voertuigen;
  beschikbareVoertuigen: Voertuigen[];
  gemaakteAfspraken: any[] = [];
  beschikbareTijden: string[] = [];
  notificaties: { titel: string, tekst: string }[] = [];
  instructeurs: string[] = ['Instructeur 1', 'Instructeur 2', 'Instructeur 3'];
  ophaallocatie!: string;
  doelLes!: string;

  // Injectie van VoertuigService en MatDialog
  constructor(private voertuigService: VoertuigService, public dialog: MatDialog) {
    // Haal beschikbare voertuigen op via de service
    this.beschikbareVoertuigen = this.voertuigService.getBeschikbareVoertuigen();
  }

  // Levenscyclusmethode die wordt aangeroepen wanneer de component is geïnitialiseerd
  ngOnInit(): void {
    // Ophalen van opgeslagen afspraken uit localStorage
    const opgeslagenAfspraken = localStorage.getItem('afspraken');
    if (opgeslagenAfspraken) {
      this.gemaakteAfspraken = JSON.parse(opgeslagenAfspraken);
    }

    // Ophalen van opgeslagen notificaties uit localStorage
    const opgeslagenNotificaties = localStorage.getItem('notificaties');
    if (opgeslagenNotificaties) {
      this.notificaties = JSON.parse(opgeslagenNotificaties);
    }

    // Bijwerken van beschikbare tijden voor de gekozen datum
    this.updateBeschikbareTijden();
  }

  // Methode om beschikbare tijden te updaten op basis van de gekozen datum
  updateBeschikbareTijden(): void {
    const now = new Date();
    const selectedDate = new Date(this.datum);
    this.beschikbareTijden = [];

    // Controleer of de gekozen datum vandaag is
    if (selectedDate.toDateString() === now.toDateString()) {
      const currentHour = now.getHours();
      for (let i = currentHour + 1; i <= 17; i++) {
        if (i >= 9 && i <= 17) {
          this.beschikbareTijden.push(this.formatTime(i));
        }
      }
    } else {
      // Anders, alle tijden tussen 9:00 en 17:00 zijn beschikbaar
      for (let i = 9; i <= 17; i++) {
        this.beschikbareTijden.push(this.formatTime(i));
      }
    }
  }

  // Hulpmethode om een uur naar een tijdstring te formatteren
  formatTime(hour: number): string {
    return hour.toString().padStart(2, '0') + ':00';
  }

  // Methode om de geldigheid van de gekozen datum te controleren
  validateDate(): boolean {
    const datum = new Date(this.datum);
    const vandaag = new Date();
    vandaag.setHours(0, 0, 0, 0);

    // Controleer of de datum in de toekomst ligt
    if (datum < vandaag) {
      alert("Kies een datum in de toekomst.");
      return false;
    }

    const dag = datum.getUTCDay();
    // Controleer of de datum op een werkdag valt (maandag t/m vrijdag)
    if (dag < 1 || dag > 5) {
      alert("Kies een datum tussen maandag en vrijdag.");
      return false;
    }

    return true;
  }

  // Methode om de geldigheid van de gekozen datum en tijd te controleren
  validateDateTime(): boolean {
    if (!this.validateDate()) {
      return false;
    }

    const tijdParts = this.tijd.split(':');
    const uur = parseInt(tijdParts[0], 10);
    // Controleer of de tijd binnen de openingstijden ligt
    if (uur < 9 || uur > 17) {
      alert("Kies een tijd tussen 9:00 en 17:00.");
      return false;
    }

    return true;
  }

  // Methode om een nieuwe afspraak te maken
  maakAfspraak(event: Event): void {
    event.preventDefault();
    // Valideer datum en tijd
    if (!this.validateDateTime()) {
      return;
    }

    // Maak een nieuw afspraakobject
    const nieuweAfspraak = {
      naam: this.naam,
      telefoon: this.telefoon,
      datumTijd: new Date(`${this.datum}T${this.tijd}`),
      voertuig: this.gekozenVoertuig,
      ophaallocatie: this.ophaallocatie,
      doelLes: this.doelLes,
      instructeur: this.instructeurs, // Dit lijkt een array te zijn, wat niet logisch is voor een enkele afspraak
      voltooid: false
    };

    // Voeg de nieuwe afspraak toe aan de gemaakte afspraken
    this.gemaakteAfspraken.push(nieuweAfspraak);
    // Sla de gemaakte afspraken op in localStorage
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
    console.log("Nieuwe afspraak aangemaakt:", nieuweAfspraak);
  }

  // Methode om een afspraak te verwijderen op basis van de index
  verwijderAfspraak(index: number): void {
    this.gemaakteAfspraken.splice(index, 1);
    // Werk localStorage bij na het verwijderen van een afspraak
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
  }

  // Methode om een afspraak als voltooid te markeren
  markeerAlsVoltooid(index: number): void {
    // Open een dialog om feedback in te voeren
    const dialogRef = this.dialog.open(VoltooiDialogComponent, {
      width: '400px',
      data: { feedback: '' }
    });

    // Update afspraak als de dialog gesloten is met feedback
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gemaakteAfspraken[index].voltooid = true;
        this.gemaakteAfspraken[index].feedback = result.feedback;
        // Werk localStorage bij na het markeren van een afspraak als voltooid
        localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
      }
    });
  }

  // Methode om een notificatie dialoog te openen
  openNotificatieDialog(notificatie?: any, index?: number): void {
    const dialogRef = this.dialog.open(NotificatieDialogComponent, {
      width: '400px',
      data: notificatie ? { ...notificatie } : { titel: '', tekst: '' }
    });

    // Werk notificaties bij als de dialog gesloten is
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (index !== undefined) {
          this.notificaties[index] = result;
        } else {
          this.notificaties.push(result);
        }
        // Werk localStorage bij na het toevoegen/bijwerken van notificaties
        localStorage.setItem('notificaties', JSON.stringify(this.notificaties));
      }
    });
  }

  // Methode om een notificatie te verwijderen op basis van de index
  verwijderNotificatie(index: number): void {
    this.notificaties.splice(index, 1);
    // Werk localStorage bij na het verwijderen van een notificatie
    localStorage.setItem('notificaties', JSON.stringify(this.notificaties));
  }
}
