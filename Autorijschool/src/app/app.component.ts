import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {NavigationComponent} from "./navigation/navigation.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, HttpClientModule, ProfileComponent, HomeComponent, LoginComponent, RegistrationComponent, NavigationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'Autorijschool';
}
