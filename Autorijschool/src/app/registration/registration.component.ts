import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  userData = {
    name: '',
    adress: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  register() {
    // Implementeer hier de logica voor het registreren, bijvoorbeeld het verzenden van de gegevens naar een API
    console.log('Registratiegegevens:', this.userData);
  }
}
