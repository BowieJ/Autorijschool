import {Component} from '@angular/core';
import {VOERTUIG} from "../voertuigen";
import {NgForOf} from "@angular/common";
import {RouterModule} from '@angular/router';

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
    voertuigen = VOERTUIG;
}

