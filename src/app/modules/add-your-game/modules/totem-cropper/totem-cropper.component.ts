import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'totem-cropper',
  templateUrl: './totem-cropper.component.html',
  styleUrls: ['./totem-cropper.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class TotemCropperComponent implements OnInit, OnDestroy {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public dialogRef: MatDialogRef<TotemCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

  ngOnInit() {
    console.log(this.data);
    this.loading$.next(true);
    this.imageChangedEvent = this.data;
  }

  ngOnDestroy(): void {
  }

  /* imageCropped(event: ImageCroppedEvent) {
      this.imageUrl = event.base64!;
      console.log(this.croppedImage);

  } */
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
    console.log('READY');
    this.loading$.next(false);
  }
  loadImageFailed() {
      // show message
  }

  imageCropped(event: ImageCroppedEvent) {
    // Preview
    //this.imageUrl = event.base64!;

    const fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name,
    )
    console.log(fileToReturn);
    this.croppedImage = fileToReturn;
  }


  base64ToFile(data: any, filename: string) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  closeDialog() {
    this.dialogRef.close(this.croppedImage);
  }

}
