import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DROP_BLOCK_TYPE } from '@app/core/enums/submission-tabs.enum';
import { UserStateService } from '@app/core/services/user-state.service';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'totem-image-dropzone',
  templateUrl: './totem-image-dropzone.component.html',
  styleUrls: ['./totem-image-dropzone.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class TotemImageDropzoneComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  file!: File;
  imageUrl!: string;
  imageReader: FileReader = new FileReader();


  dzHovered: boolean = false;

  imageChangedEvent: any = '';
    croppedImage: any = '';

  @Input() recommendedResolution: string = '';
  @Input() selfFill: boolean = false;
  @Input() dzMinHeight: string = '247px';

  @Output() finalizedFile: EventEmitter<File> = new EventEmitter<File>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setHover() {
    if (!this.dzHovered) this.dzHovered = true;
  }

  removeHover() {
    this.dzHovered = false;
  }

  getFile(event: any) {
    console.log(event);
    this.imageChangedEvent = event;
    this.file = event.target.files[0];
    console.log(this.file);
    this.imageReader.readAsDataURL(this.file);
    this.imageReader.onload = (event: any) => { this.imageUrl = event.target.result };
  }



    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    /* imageCropped(event: ImageCroppedEvent) {
        this.imageUrl = event.base64!;
        console.log(this.croppedImage);

    } */
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    imageCropped(event: ImageCroppedEvent) {
      // Preview
      this.imageUrl = event.base64!;

      const fileToReturn = this.base64ToFile(
        event.base64,
        this.file.name,
      )
      console.log(fileToReturn);
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

}
