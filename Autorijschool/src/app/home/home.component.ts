import {Component} from '@angular/core';
import {NavigationComponent} from "../navigation/navigation.component";
import {CommonModule} from "@angular/common";
import {VoertuigenComponent} from "../voertuigen/voertuigen.component";
import {RouterModule} from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, NavigationComponent, VoertuigenComponent, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
