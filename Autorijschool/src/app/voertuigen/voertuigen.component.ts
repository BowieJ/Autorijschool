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
<<<<<<< Updated upstream
export class VoertuigenComponent {
  voertuigen!: Voertuigen[];

  constructor(private voertuigService: VoertuigService) { }
=======
export class VoertuigenComponent implements OnInit {
  voertuigen: Voertuigen[] = []; // Array om de voertuigen in op te slaan

  // Constructor voor de VoertuigenComponent
  constructor(private voertuigService: VoertuigService, public dialog: MatDialog) { }
>>>>>>> Stashed changes

  // Lifecycle hook die wordt aangeroepen wanneer de component wordt geïnitialiseerd
  ngOnInit(): void {
    this.voertuigen = this.voertuigService.getVoertuigen(); // Haal de voertuigen op via de service
  }
<<<<<<< Updated upstream
=======

  // Open een dialoog voor het toevoegen of bewerken van een voertuig
  openDialog(voertuig: Voertuigen = { id: 0, merk: '', soort: '', kenteken: '', fotoUrl: '', status: 'Beschikbaar' }): void {
    const dialogRef = this.dialog.open(VoertuigDialogComponent, {
      width: '400px',
      data: voertuig // Geef het voertuig door aan de dialoog
    });

    // Acties na het sluiten van de dialoog
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id === 0) {
          result.id = this.voertuigen.length + 1; // Geef een nieuw voertuig een nieuw ID
          this.voertuigService.addVoertuig(result); // Voeg het nieuwe voertuig toe
        } else {
          this.voertuigService.updateVoertuig(result); // Update een bestaand voertuig
        }
        this.voertuigen = this.voertuigService.getVoertuigen(); // Werk de lijst van voertuigen bij
      }
    });
  }

  // Verwijder een voertuig na bevestiging
  voertuigVerwijderen(id: number): void {
    const confirmation = confirm('Weet je zeker dat je dit voertuig wilt verwijderen?'); // Vraag om bevestiging
    if (confirmation) {
      this.voertuigService.deleteVoertuig(id); // Verwijder het voertuig via de service
      this.voertuigen = this.voertuigService.getVoertuigen(); // Werk de lijst van voertuigen bij
    }
  }
>>>>>>> Stashed changes
}

