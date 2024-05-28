import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Voertuigen } from '../voertuigen';
import { VoertuigService } from '../voertuigen.service';
import { VoertuigDialogComponent } from '../voertuig-dialog/voertuig-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-voertuigen',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './voertuigen.component.html',
  styleUrls: ['./voertuigen.component.scss']
})
export class VoertuigenComponent implements OnInit {
  voertuigen: Voertuigen[] = [];

  constructor(private voertuigService: VoertuigService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.voertuigen = this.voertuigService.getVoertuigen();
  }

  openDialog(voertuig: Voertuigen = { id: 0, merk: '', soort: '', kenteken: '', fotoUrl: '', status: 'Beschikbaar' }): void {
    const dialogRef = this.dialog.open(VoertuigDialogComponent, {
      width: '400px',
      data: voertuig
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id === 0) {
          result.id = this.voertuigen.length + 1;
          this.voertuigService.addVoertuig(result);
        } else {
          this.voertuigService.updateVoertuig(result);
        }
        this.voertuigen = this.voertuigService.getVoertuigen();
      }
    });
  }

  voertuigVerwijderen(id: number): void {
    const confirmation = confirm('Weet je zeker dat je dit voertuig wilt verwijderen?');
    if (confirmation) {
      this.voertuigService.deleteVoertuig(id);
      this.voertuigen = this.voertuigService.getVoertuigen();
    }
  }
}
