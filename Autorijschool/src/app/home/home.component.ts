import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { CommonModule } from "@angular/common";
import { VoertuigenComponent } from "../voertuigen/voertuigen.component";
import { RouterModule } from '@angular/router';
import { Voertuigen } from "../voertuigen";
import { VoertuigService } from "../voertuigen.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavigationComponent, VoertuigenComponent, RouterModule, FormsModule],
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

  constructor(private voertuigService: VoertuigService) {
    this.beschikbareVoertuigen = this.voertuigService.getVoertuigen();
  }

  ngOnInit(): void {
    const opgeslagenAfspraken = localStorage.getItem('afspraken');
    if (opgeslagenAfspraken) {
      this.gemaakteAfspraken = JSON.parse(opgeslagenAfspraken);
    }
    this.updateBeschikbareTijden(); // Initialize available times
  }

  updateBeschikbareTijden(): void {
    const now = new Date();
    const selectedDate = new Date(this.datum);
    this.beschikbareTijden = [];

    if (selectedDate.toDateString() === now.toDateString()) {
      // For today, only show future hours
      const currentHour = now.getHours();
      for (let i = currentHour + 1; i <= 17; i++) {
        if (i >= 9 && i <= 17) {
          this.beschikbareTijden.push(this.formatTime(i));
        }
      }
    } else {
      // For other dates, show all working hours
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
}
