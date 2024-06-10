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

@Component({
  selector: 'app-home',
  standalone: true,  // Dit moet true zijn voor standalone componenten
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
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
  notificaties: { titel: string, tekst: string }[] = [];
  instructeurs: string[] = ['Instructeur 1', 'Instructeur 2', 'Instructeur 3'];
  ophaallocatie!: string;
  doelLes!: string;

  constructor(private voertuigService: VoertuigService, public dialog: MatDialog) {
    this.beschikbareVoertuigen = this.voertuigService.getBeschikbareVoertuigen(); // Haal alleen beschikbare voertuigen op
  }

  ngOnInit(): void {
    const opgeslagenAfspraken = localStorage.getItem('afspraken');
    if (opgeslagenAfspraken) {
      this.gemaakteAfspraken = JSON.parse(opgeslagenAfspraken);
    }

    const opgeslagenNotificaties = localStorage.getItem('notificaties');
    if (opgeslagenNotificaties) {
      this.notificaties = JSON.parse(opgeslagenNotificaties);
    }

    this.updateBeschikbareTijden();
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
      voertuig: this.gekozenVoertuig,
      ophaallocatie: this.ophaallocatie,
      doelLes: this.doelLes,
      instructeur: this.instructeurs,
      voltooid: false
    };

    this.gemaakteAfspraken.push(nieuweAfspraak);
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
    console.log("Nieuwe afspraak aangemaakt:", nieuweAfspraak);
  }

  verwijderAfspraak(index: number): void {
    this.gemaakteAfspraken.splice(index, 1);
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
  }

  markeerAlsVoltooid(index: number): void {
    const dialogRef = this.dialog.open(VoltooiDialogComponent, {
      width: '400px',
      data: { feedback: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gemaakteAfspraken[index].voltooid = true;
        this.gemaakteAfspraken[index].feedback = result.feedback;
        localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
      }
    });
  }

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

  verwijderNotificatie(index: number): void {
    this.notificaties.splice(index, 1);
    localStorage.setItem('notificaties', JSON.stringify(this.notificaties));
  }
}
