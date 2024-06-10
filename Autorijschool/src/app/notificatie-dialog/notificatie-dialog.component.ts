import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-notificatie-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './notificatie-dialog.component.html',
  styleUrls: ['./notificatie-dialog.component.scss']
})
export class NotificatieDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NotificatieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titel: string, tekst: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
