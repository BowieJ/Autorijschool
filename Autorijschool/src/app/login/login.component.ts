import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userData = {
    email: '',
    password: ''
  };

  login() {
    // Implementeer hier de logica voor het inloggen, bijvoorbeeld het verifiëren van de gegevens met een back-end API
    console.log('Inloggegevens:', this.userData);
  }
}
