import {Component} from '@angular/core';
import {NavigationComponent} from "../navigation/navigation.component";
import {CommonModule} from "@angular/common";
import {VoertuigenComponent} from "../voertuigen/voertuigen.component";
import {RouterModule} from '@angular/router';
import {Voertuigen} from "../voertuigen";
import {VoertuigService} from "../voertuigen.service";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, NavigationComponent, VoertuigenComponent, RouterModule, FormsModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  naam!: string;
  telefoon!: string;
  datumTijd!: Date;
  gekozenVoertuig!: number;
  beschikbareVoertuigen: Voertuigen[];
  gemaakteAfspraken: any[] = [];

  constructor(private voertuigService: VoertuigService) {
    this.beschikbareVoertuigen = this.voertuigService.getVoertuigen();
  }

  maakAfspraak(): void {
      const nieuweAfspraak = {
          naam: this.naam,
          telefoon: this.telefoon,
          datumTijd: this.datumTijd,
          voertuig: this.beschikbareVoertuigen.find(voertuig => voertuig.id === this.gekozenVoertuig)
      };
      this.gemaakteAfspraken.push(nieuweAfspraak);
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
    console.log("nieuwe afspraak aangemaakt.")
    console.log(this.beschikbareVoertuigen)
  }

  ngOnInit(): void {
    const opgeslagenAfspraken = localStorage.getItem('afspraken');
    if (opgeslagenAfspraken) {
      this.gemaakteAfspraken = JSON.parse(opgeslagenAfspraken);
    }
  }
  verwijderAfspraak(index: number): void {
    // Verwijder de afspraak uit de lijst
    this.gemaakteAfspraken.splice(index, 1);

    // Update de LocalStorage
    localStorage.setItem('afspraken', JSON.stringify(this.gemaakteAfspraken));
  }


}
