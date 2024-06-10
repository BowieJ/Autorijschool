import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-voltooi-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  templateUrl: './voltooi-dialog.component.html',
  styleUrls: ['./voltooi-dialog.component.scss']
})
export class VoltooiDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VoltooiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { feedback: string, voltooid: boolean }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
