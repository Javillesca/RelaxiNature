import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../../../interfaces/i-dialog-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
      public dialog: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IDialogData
    ) { }

  ngOnInit(): void {
  }

}
