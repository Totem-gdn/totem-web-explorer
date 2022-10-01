import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'totem-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class ImageUploaderComponent implements OnInit, OnDestroy {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  aspectRatio: number = 0;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public dialogRef: MatDialogRef<ImageUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

  ngOnInit() {

  }



  ngOnDestroy(): void {
  }

}
