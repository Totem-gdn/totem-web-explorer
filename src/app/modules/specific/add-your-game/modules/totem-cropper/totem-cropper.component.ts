import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { BehaviorSubject } from 'rxjs';
import Cropper from 'cropperjs';

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
  imageBase64: string = '';
  croppedImage: any = '';
  aspectRatio: number = 0;
  widthToResize: number = 0;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  imageReader: FileReader = new FileReader();
  tranformOptions: ImageTransform = {};
  rotateValue: number = 0;
  previousScaleValue: number = 0;
  scaleValue: number = 0;
  sliderGroup = new FormGroup({
    tick: new FormControl<number>(0),
  });

  @ViewChild("image", {static: false}) public imageElement!: ElementRef;
  private cropper!: Cropper;

  constructor(
    public dialogRef: MatDialogRef<TotemCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

  ngOnInit() {
    this.loading$.next(true);
    this.widthToResize = this.data.widthToResize;
    this.aspectRatio = this.data.aspectRatio;
    this.imageBase64 = this.data.imageBase64;
    this.imageChangedEvent = this.data.file;
    this.sliderGroup.get('tick')!.valueChanges.subscribe((x: number | null) => {
      this.scaleValue = x!;
      this.scaleImage();
    });
  }

  ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: true,
      responsive: true,
      aspectRatio: this.aspectRatio,
      scalable: false,
      movable: true,
      dragMode: 'move',
      viewMode: 0,
      autoCropArea: 1,
      zoomOnWheel: false,
      ready: () => {
        this.cropImageAndSave();
        this.loading$.next(false);
      },
      cropend: () => {
        this.cropImageAndSave();
      }
    });
  }

  /* initCropper() {
    this.imageReader.onload = (event: any) => {
      console.log(event.target.result);
      this.imageBase64 = event.target.result;
      this.icropper();
    };
    console.log(this.data.file.target.files[0]);

    this.imageReader.readAsDataURL(this.data.file.target.files[0]);
    console.log('INIT?');
  } */

  /* icropper() {
    console.log('called?');
    this.loading$.next(false);
    const image = document.getElementById('imgSrc') as HTMLImageElement;
    this.cropper = new Cropper(image, {
      zoomable: true,
      aspectRatio: this.aspectRatio,
      scalable: false,
      movable: true,
      dragMode: 'move',
      viewMode: 0,
      autoCropArea: 1,
      zoomOnWheel: false,
      ready: () => {
        this.cropImageAndSave();
      },
      cropend: () => {
        this.cropImageAndSave();
      }
    });
    //this.cropper.replace(this.imageBase64);

  } */

  cropImageAndSave() {
    console.log('called');
    const canvas = this.cropper.getCroppedCanvas({imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',});
    const image64 = canvas.toDataURL('image/webp', 1);
    const fileToReturn = this.base64ToFile(
      image64,
      this.imageChangedEvent.target.files[0].name,
    )
    this.croppedImage = fileToReturn;
  }

  ngOnDestroy(): void {
    this.cropper.destroy();
  }

  rotateImage() {
    //this.rotateValue = this.rotateValue >= 0 && this.rotateValue < 360 ? this.rotateValue + 45 : 45;
    this.cropper.rotate(45);
    this.cropImageAndSave();
  }

  scaleImage() {
    if (this.scaleValue > this.previousScaleValue) {
      this.cropper.zoom(0.1);
    } else if (this.scaleValue < this.previousScaleValue) {
      this.cropper.zoom(-0.1);
    }
    this.previousScaleValue = this.scaleValue;
  }

  imageLoaded() {
      // show cropper
  }
  cropperReady() {
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
