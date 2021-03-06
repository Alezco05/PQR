import { Component, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
