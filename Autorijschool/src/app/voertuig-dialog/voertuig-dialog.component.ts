import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Voertuigen } from '../voertuigen';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voertuig-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voertuig-dialog.component.html',
  styleUrls: ['./voertuig-dialog.component.scss']
})
export class VoertuigDialogComponent {
  voertuig: Voertuigen;

  constructor(
    public dialogRef: MatDialogRef<VoertuigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Voertuigen
  ) {
    this.voertuig = { ...data }; // Make a copy of the data to edit
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.voertuig.fotoUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  voertuigOpslaan(): void {
    this.dialogRef.close(this.voertuig);
  }
}
