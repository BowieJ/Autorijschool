import {Component} from '@angular/core';
import {VOERTUIG, Voertuigen} from "../voertuigen";
import {NgForOf} from "@angular/common";
import {RouterModule} from '@angular/router';
import {VoertuigService} from "../voertuigen.service";

@Component({
    selector: 'app-voertuigen',
    standalone: true,
    imports: [
        NgForOf,
        RouterModule
    ],
    templateUrl: './voertuigen.component.html',
    styleUrls: ['./voertuigen.component.scss']
})
export class VoertuigenComponent {
  voertuigen: Voertuigen[];

  constructor(private voertuigService: VoertuigService) { }

  ngOnInit(): void {
    this.voertuigen = this.voertuigService.getVoertuigen();
  }
}

