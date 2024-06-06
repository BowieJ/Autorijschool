import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Voertuigen } from '../voertuigen';
import { VoertuigService } from '../voertuigen.service';
import { VoertuigDialogComponent } from '../voertuig-dialog/voertuig-dialog.component';
import { NotificatieDialogComponent } from '../notificatie-dialog/notificatie-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  naam!: string;
  telefoon!: string;
  datum!: string;
  tijd!: string;
  gekozenVoertuig!: Voertuigen;
  beschikbareVoertuigen: Voertuigen[];
  gemaakteAfspraken: any[] = [];
  beschikbareTijden: string[] = [];
  notificaties: { titel: string, tekst: string }[] = []; // Notificaties array

  constructor(private voertuigService: VoertuigService, public dialog: MatDialog) {
    this.beschikbareVoertuigen = this.voertuigService.getVoertuigen();
  }

  ngOnInit(): void {
    const opgeslagenAfspraken = localStorage.getItem('afspraken');
    if (opgeslagenAfspraken) {
      this.gemaakteAfspraken = JSON.parse(opgeslagenAfspraken);
    }
    this.updateBeschikbareTijden(); // Initialiseer beschikbare tijden
  }

  updateBeschikbareTijden(): void {
    const now = new Date();
    const selectedDate = new Date(this.datum);
    this.beschikbareTijden = [];

    if (selectedDate.toDateString() === now.toDateString()) {
      const currentHour = now.getHours();
      for (let i = currentHour + 1; i <= 17; i++) {
        if (i >= 9 && i <= 17) {
          this.beschikbareTijden.push(this.formatTime(i));
        }
      }
    } else {
      for (let i = 9; i <= 17; i++) {
        this.beschikbareTijden.push(this.formatTime(i));
      }
    }
  }

  formatTime(hour: number): string {
    return hour.toString().padStart(2, '0') + ':00';
  }

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

  maakAfspraak(event: Event): void {
    event.preventDefault();
    if (!this.validateDateTime()) {
      return;
    }

    const nieuweAfspraak = {
      naam: this.naam,
      telefoon: this.telefoon,
      datumTijd: new Date(`${this.datum}T${this.tijd}`),
      voertuig: this.gekozenVoertuig
    };

    this.gemaakteAfspraken.push(nieuweAfspraak);
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
    console.log("Nieuwe afspraak aangemaakt:", nieuweAfspraak);
  }

  verwijderAfspraak(index: number): void {
    this.gemaakteAfspraken.splice(index, 1);
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
  }

  openNotificatieDialog(notificatie: any = null, index: number | null = null): void {
    const dialogRef = this.dialog.open(NotificatieDialogComponent, {
      width: '400px',
      data: notificatie ? { ...notificatie } : { titel: '', tekst: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (index !== null) {
          this.notificaties[index] = result;
        } else {
          this.notificaties.push(result);
        }
      }
    });
  }

  verwijderNotificatie(index: number): void {
    this.notificaties.splice(index, 1);
  }
}
