import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatRoom } from '../model/chat-room.model';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChatRoom
  ){}

  onClick(): void{
    this.dialogRef.close();
  }
}
