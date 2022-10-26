import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage, base64ToFile, ImageTransform } from 'ngx-image-cropper';
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
  aspectRatio: number = 0;
  widthToResize: number = 0;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tranformOptions: ImageTransform = {};
  rotateValue: number = 0;
  scaleValue: number = 1;
  sliderGroup = new FormGroup({
    tick: new FormControl<number>(1),
  })

  constructor(
    public dialogRef: MatDialogRef<TotemCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

  ngOnInit() {
    console.log(this.data);
    this.loading$.next(true);
    this.widthToResize = this.data.widthToResize;
    this.aspectRatio = this.data.aspectRatio;
    this.imageChangedEvent = this.data.file;
    this.sliderGroup.get('tick')!.valueChanges.subscribe((x: number | null) => {
      console.log(x);
      this.scaleValue = x!;
      this.scaleImage();
    })
  }

  ngOnDestroy(): void {
  }

  rotateImage() {
    this.rotateValue = this.rotateValue >= 0 && this.rotateValue < 360 ? this.rotateValue + 90 : 90;
    this.tranformOptions = {
      ...this.tranformOptions,
      rotate: this.rotateValue
    }
  }

  scaleImage() {
    this.tranformOptions = {
      ...this.tranformOptions,
      scale: this.scaleValue
    }
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
