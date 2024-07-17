import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {

constructor(public dialogref: MatDialogRef<DeleteDialogComponent>){

}

  onConfirm(): void {
    this.dialogref.close(true);
  }

  onCancel(): void {
    this.dialogref.close(false);
  }
}
