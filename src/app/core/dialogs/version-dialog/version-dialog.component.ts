import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'totem-version-dialog',
  templateUrl: './version-dialog.component.html',
  styleUrls: ['./version-dialog.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  },
})
export class VersionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VersionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {

  }

}
