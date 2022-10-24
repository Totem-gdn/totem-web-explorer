import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { id } from 'alchemy-sdk/dist/src/api/utils';
import { Subscription } from 'rxjs';

export interface DropzoneError {
  message: string;
  status: boolean;
}

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
  jsonFile!: File;

  errorState: boolean = false;
  errorMessage: string = '';

  recWidth: number = 0;
  recHeight: number = 0;

  dzHovered: boolean = false;

  croppedImage: any = '';

  @Input() recommendedResolution: string = '';
  @Input() selfFill: boolean = false;
  @Input() jsonFileType: boolean = false;
  @Input() dzMinHeight: string = '247px';
  @Input() finalizedImage!: File;
  @Input() uniqueId: string = 'file';

  @Output() finalizedFile: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorEvent: EventEmitter<DropzoneError> = new EventEmitter<DropzoneError>();

  constructor() {
  }

  ngOnInit() {
    if (this.recommendedResolution) {
      let arr: string[] = this.recommendedResolution.split('x');
      //console.log(arr);
      this.recWidth = Number(arr[0]);
      this.recHeight = Number(arr[1]);
      console.log(this.recWidth, this.recHeight);

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['finalizedImage']) {
      if (this.finalizedImage) {
        this.imageReader.readAsDataURL(this.finalizedImage);
        this.imageReader.onload = (event: any) => { this.imageUrl = event.target.result };
      }
    }
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

  validateFile(event: any): boolean {
    if (this.jsonFileType) {
      return event?.type === 'application/json' ? true : false;
    }
    return event?.type.includes('image/') ? true : false;
  }

  isImage(event: any): boolean {
    return event?.type.includes('image/') ? true : false;
  }

  getFile(event: any) {

    if (this.errorState) {
      this.errorState = false;
      this.errorEvent.emit({message: '', status: false});
    }

    const fileToValidate: File = event.target.files[0];
    console.log(fileToValidate);

    if (this.isImage(fileToValidate)) {

      if (fileToValidate.size > 20971520) {
        console.log('File size is big');
        return;
      }

      /* const reader = new FileReader();
      reader.onload = (evt: any) => {
        const img = new Image();
        //console.log(img);
        img.src = evt.target.result;
        img.onload = (rs: any) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log('asf: ', img_height, img_width);
          console.log('our: ', this.recHeight, this.recWidth);
          if ((img_height > this.recHeight + 400) && (img_width > this.recWidth + 400) || (img_height < this.recHeight - 400) && (img_width < this.recWidth - 400)) {
            console.log('The image is much larger/smaller than the recommended resolution.');
            this.errorEvent.emit({message: `The image is much larger/smaller than the recommended resolution: ${this.recWidth}x${this.recHeight}px`, status: true})
            this.errorState = true;
            return;
          } */
      this.finalizedFile.next(event);
      /*   };
      };
      reader.readAsDataURL(fileToValidate); */
      return;
    }

    if (this.validateFile(fileToValidate)) {
        this.file = fileToValidate;
        console.log(this.file);
        if (this.file) {
          this.finalizedFile.next(event);
        }
    } else {
      console.log('Your input is incorrect');
    }

    this.removeHover();
  }

  submitFile(event: any) {

  }

}
