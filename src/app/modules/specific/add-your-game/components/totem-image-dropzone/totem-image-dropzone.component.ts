import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { DNAItemFilter } from '@app/core/models/interfaces/dna-item-filter.interface';
import { DNASchemeValidator } from '@app/core/services/utils/dna-scheme-validator';
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

  validator = new DNASchemeValidator();

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

  isJson(event: any): boolean {
    return event?.type === 'application/json' ? true : false;
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
    this.getDataUrlAndSaveFiles(event, filesToAdd);

    /* const reader = new FileReader();
    reader.onload = (evt: any) => {
      this.finalizedFile.next({file: event, imageBase64: evt.target.result});
      this.removeHover();
    };
    reader.readAsDataURL(fileToValidate);

    this.multipleFilesEvent.emit(event);
    this.removeHover(); */
  }

  getDataUrlAndSaveFiles(event: any, filesToAdd: File[]) {
    let count: number = 0;
    let imagesBase64: string[] = [];
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      imagesBase64.push(evt.target.result);
      if (count == filesToAdd.length) {
        this.multipleFilesEvent.emit({files: event, imageBase64: imagesBase64});
        this.removeHover();
      } else {
        reader.readAsDataURL(filesToAdd[count]);
        count += 1;
      }
    };
    count += 1;
    reader.readAsDataURL(filesToAdd[0]);
  }

  // end of multiple

  getFile(event: any) {

    if (this.errorState) {
      this.errorState = false;
      this.errorEvent.emit({message: '', status: false});
    }

    const fileToValidate: File = event.target.files[0];
    if (!fileToValidate) return;

    if (this.isImage(fileToValidate) && !this.jsonFileType) {
      if (fileToValidate.size > 20971520) {
        this.snackNotifierService.open('File is very large');
        this.removeHover();
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(fileToValidate);
      reader.onload = (evt: any) => {
        this.finalizedFile.next({file: event, imageBase64: evt.target.result});
        this.removeHover();
      };
      //this.finalizedFile.next(event);
      return;
    }

    // not json
    if (!this.isJson(fileToValidate)) {
      this.snackNotifierService.open('Your input file is incorrect');
      this.removeHover();
      return;
    };

    // is json
    if (fileToValidate) {
      if (fileToValidate.size > 100000) {
        this.snackNotifierService.open('File is very large, max file size is 100B');
        this.removeHover();
        return;
      }
      this.validateJson(fileToValidate, event);
      // this.finalizedFile.next(event);
    }

    this.removeHover();
  }

  validateJson(fileToValidate: File, inputEvent: any) {
    let json: any[] = [];
    const reader = new FileReader();
    reader.readAsText(fileToValidate, "UTF-8");
    reader.onload = (event: any) => {

      if (!event.target.result) {
        this.snackNotifierService.open('Your JSON file is empty');
        return;
      }

      try {
        JSON.parse(event.target.result);
      } catch (err: any) {
        console.log(err.message);
        this.snackNotifierService.open('Error: ' + err.message);
        return;
      }

      json = JSON.parse(event.target.result);
      if (!Array.isArray(json)) {
        this.snackNotifierService.open('Your JSON file body is incorrect');
        return;
      }

      if (!json.length) {
        this.snackNotifierService.open('Your JSON file body is empty');
        return;
      }

      const validationResult = json.every((item: DNAItemFilter) => {
        const validity: string = this.validator.validateJson(item);
        return validity == 'OK' ? true : false;
      });

      console.log(validationResult);
      if (!validationResult) {
        this.setInputError('Something went wrong when validating your DNA filter. Please make sure if everything is correct');
        return;
      }

      console.log('FILE PASSES ALL VALIDATIONS AND PUSHED TO FILES TO SEND');
      this.finalizedFile.next(inputEvent);

    }
  }

  removeInput(event: any) {
    event.target.value = '';
  }

  setInputError(msg: string) {
    this.errorState = true;
    this.errorEvent.emit({message: msg, status: true});
  }

}
