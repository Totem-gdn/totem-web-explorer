import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
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
  @Input() finalizedImage!: File | undefined;
  @Input() uniqueId: string = 'file';
  @Input() existingImageUrl?: string = '';
  @Input() multipleFiles: boolean = false;

  @Output() multipleFilesEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() finalizedFile: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorEvent: EventEmitter<DropzoneError> = new EventEmitter<DropzoneError>();

  @ViewChild('upload') fileInput!: ElementRef;

  constructor(private snackNotifierService: SnackNotifierService) {
  }

  ngOnInit() {
    if (this.recommendedResolution) {
      let arr: string[] = this.recommendedResolution.split('x');
      this.recWidth = Number(arr[0]);
      this.recHeight = Number(arr[1]);

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['finalizedImage']) {
      if (this.finalizedImage) {
        this.imageReader.readAsDataURL(this.finalizedImage);
        this.imageReader.onload = (event: any) => { this.imageUrl = event.target.result };
      } else if (this.selfFill) {
        this.imageUrl = '';
      }
    }
  }

  openFileBrowser() {
    this.fileInput.nativeElement.click();
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


  // multiple

  processMultipleFiles(event: any) {
    if (this.errorState) {
      this.errorState = false;
      this.errorEvent.emit({message: '', status: false});
    }
    let filesToAdd: File[] = [];

    const filesToValidate: File[] = Array.from(event.target.files);
    filesToValidate.forEach((file: File, i: number) => {
      if (this.isImage(file)) {
        if (file.size > 20971520) {
          this.snackNotifierService.open('File at position ' + i + ' is very large');
          return;
        }
        filesToAdd.push(file);
      }
    });
    if (filesToValidate.length !== filesToAdd.length) {
      this.snackNotifierService.open('Your input files are incorrect');
      this.removeHover();
      return;
    }
    this.multipleFilesEvent.emit(event);
    this.removeHover();
  }

  // end of multiple

  getFile(event: any) {

    if (this.errorState) {
      this.errorState = false;
      this.errorEvent.emit({message: '', status: false});
    }

    const fileToValidate: File = event.target.files[0];

    if (this.isImage(fileToValidate)) {
      if (fileToValidate.size > 20971520) {
        this.snackNotifierService.open('File is very large');
        return;
      }
      this.finalizedFile.next(event);
      this.removeHover();
      return;
    }

    if (this.validateFile(fileToValidate)) {
        this.file = fileToValidate;
        if (this.file) {
          this.finalizedFile.next(event);
        }
    } else {
      this.snackNotifierService.open('Your input file is incorrect');
    }

    this.removeHover();
  }

  submitFile(event: any) {

  }

}
