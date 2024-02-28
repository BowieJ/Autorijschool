import {Component} from '@angular/core';
import {NavigationComponent} from "../navigation/navigation.component";
import {CommonModule} from "@angular/common";
import {VoertuigenComponent} from "../voertuigen/voertuigen.component";
import {RouterModule} from '@angular/router';
import {Voertuigen} from "../voertuigen";
import {VoertuigService} from "../voertuigen.service";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, NavigationComponent, VoertuigenComponent, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  naam: string;
  contactgegevens: string;
  datumTijd: Date;
  gekozenVoertuig: number;
  beschikbareVoertuigen: Voertuigen[];

  constructor(private voertuigService: VoertuigService) {
    this.beschikbareVoertuigen = this.voertuigService.getVoertuigen();
  }

  maakAfspraak(): void {
  }
}
