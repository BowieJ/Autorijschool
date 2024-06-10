import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VoertuigenComponent } from "./voertuigen/voertuigen.component";
import { VoertuigDialogComponent } from "./voertuig-dialog/voertuig-dialog.component";
import { CommonModule } from '@angular/common';
import { NotificatieDialogComponent } from "./notificatie-dialog/notificatie-dialog.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { VoltooiDialogComponent } from "./voltooi-dialog/voltooi-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ProfileComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    VoertuigenComponent,
    VoertuigDialogComponent,
    NotificatieDialogComponent,
    MatInputModule,
    MatFormFieldModule,
    VoltooiDialogComponent,
    HomeComponent  // Zorg ervoor dat dit correct is toegevoegd
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Autorijschool';
}
