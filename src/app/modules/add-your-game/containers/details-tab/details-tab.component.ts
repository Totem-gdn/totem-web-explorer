import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Animations } from '@app/core/animations/animations';
import { DROP_BLOCK_TYPE } from '@app/core/enums/submission-tabs.enum';
import { ImagesInfo, ImagesToUpload, SubmitGame } from '@app/core/models/submit-game-interface.model';
import { UserStateService } from '@app/core/services/user-state.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DropzoneError } from '../../components/totem-image-dropzone/totem-image-dropzone.component';
import { TotemCropperComponent } from '../../modules/totem-cropper/totem-cropper.component';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'totem-details-tab',
  templateUrl: './details-tab.component.html',
  styleUrls: ['./details-tab.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  },
  animations: Animations.animations
})
export class DetailsTabComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  imageReader: FileReader = new FileReader();
  finalizedImage!: File;
  finalizedCardImage!: File;
  finalizedSearchImage!: File;
  finalizedGalleryImages: File[] = [];
  allowButton: boolean = false;

  errorsArr: DropzoneError[] = [
    {message: '', status: false},
    {message: '', status: false},
    {message: '', status: false},
    {message: '', status: false},
  ]

  imageHover: any = {
    coverImgHovered: false,
    cardImgHovered: false,
    searchImgHovered: false,
    galleryImgHovered: false,
  };

  @Input() set savedImages(value: ImagesToUpload) {
    if (value) {
      this.finalizedImage = value.coverImage!;
      this.finalizedCardImage = value.cardImage!;
      this.finalizedSearchImage = value.searchImage!;
      this.finalizedGalleryImages = value.gallery!;
    }
  };

  @Output() formDataEvent: EventEmitter<ImagesInfo> = new EventEmitter();
  @Output() imageFilesEvent: EventEmitter<ImagesToUpload> = new EventEmitter();
  @Output() tabSelected = new EventEmitter<string>();

  constructor(readonly matDialog: MatDialog, private formsService: FormsService) {
  }

  ngOnInit() {
    this.subs.add(
      this.formsService.tabsValidity$().subscribe(tabs => {
        if(tabs.basicInfoValid && tabs.detailsValid) {
          this.allowButton = true;
        } else {
          this.allowButton = false;
        }
      })
    )
  }

  updateFormData() {
    const formDataToSend: ImagesInfo = {
      coverImage: {
        mimeType: this.finalizedImage?.type,
        filename: this.finalizedImage?.name,
        contentLength: this.finalizedImage?.size
      },
      cardThumbnail: {
        mimeType: this.finalizedCardImage?.type,
        filename: this.finalizedCardImage?.name,
        contentLength: this.finalizedCardImage?.size
      },
      smallThumbnail: {
        mimeType: this.finalizedSearchImage?.type,
        filename: this.finalizedSearchImage?.name,
        contentLength: this.finalizedSearchImage?.size
      },
      gallery:
        this.finalizedGalleryImages.map((image: File) => {
          return {
            mimeType: image?.type,
            filename: image?.name,
            contentLength: image?.size
          }
        })
    }
    this.formDataEvent.emit(formDataToSend);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setHover(type: string) {
    if (type == DROP_BLOCK_TYPE.COVER) {
      if (!this.imageHover.coverImgHovered) this.imageHover.coverImgHovered = true;
    }
    if (type == DROP_BLOCK_TYPE.CARD) {
      if (!this.imageHover.cardImgHovered) this.imageHover.cardImgHovered = true;
    }
    if (type == DROP_BLOCK_TYPE.SEARCH) {
      if (!this.imageHover.searchImgHovered) this.imageHover.searchImgHovered = true;
    }
    if (type == DROP_BLOCK_TYPE.GALLERY) {
      if (!this.imageHover.galleryImgHovered) this.imageHover.galleryImgHovered = true;
    }
  }

  removeHover(type: string) {
    if (type == DROP_BLOCK_TYPE.COVER) {
      this.imageHover.coverImgHovered = false;
    }
    if (type == DROP_BLOCK_TYPE.CARD) {
      this.imageHover.cardImgHovered = false;
    }
    if (type == DROP_BLOCK_TYPE.SEARCH) {
      this.imageHover.searchImgHovered = false;
    }
    if (type == DROP_BLOCK_TYPE.GALLERY) {
      this.imageHover.galleryImgHovered = false;
    }
  }

  removeImage(item: any) {
    this.finalizedGalleryImages = this.finalizedGalleryImages.filter((image: File) => {
      return image.name != item.name;
    })
  }

  updateCoverError(error: DropzoneError) {
    if (error) {
      this.errorsArr[0].message = error.message;
      this.errorsArr[0].status = error.status;
    }
  }
  updateCardError(error: DropzoneError) {
    if (error) {
      this.errorsArr[1].message = error.message;
      this.errorsArr[1].status = error.status;
    }
  }
  updateThumbError(error: DropzoneError) {
    if (error) {
      this.errorsArr[2].message = error.message;
      this.errorsArr[2].status = error.status;
    }
  }
  updateGalleryError(error: DropzoneError) {
    if (error) {
      this.errorsArr[3].message = error.message;
      this.errorsArr[3].status = error.status;
    }
  }

  isFormValid() {
    if(this.checkValidity()) {
      this.formsService.setFormValidity('details', true);
    } else {
      this.formsService.setFormValidity('details', false);
    }
  }

  checkValidity(): boolean {
    return this.finalizedImage && this.finalizedCardImage && this.finalizedSearchImage && Boolean(this.finalizedGalleryImages.length);
  }

  onNextTab() {
    this.tabSelected.emit('links');
  }

  cropSelectedImage(event: any, type: string) {
    this.openCropperDialog(event, type);
  }

  openCropper(image: any, type: string): Observable<string> {
    const dialogType: string = type == 'cover' || 'gallery' ? 'large-dialog' : 'small-dialog';
    const aspectRation: number = type == 'cover' ? 3.5/1 : type == 'search' ? 1/1 : type == 'gallery' ? 1.78/1 : 1.33/1;
    const options: MatDialogConfig = {
        disableClose: false,
        panelClass: dialogType,
        data: {
          file: image,
          aspectRatio: aspectRation
        },
        autoFocus: false
    };
    return this.matDialog.open(TotemCropperComponent, options).afterClosed();
  }

  openCropperDialog(image: any, type: string) {
    this.subs.add(
      this.openCropper(image, type).subscribe((data: any) => {
        if (data) {
          console.log(data);
          if (type == 'cover') this.finalizedImage = data;
          if (type == 'card') this.finalizedCardImage = data;
          if (type == 'search') this.finalizedSearchImage = data;
          if (type == 'gallery') this.finalizedGalleryImages.push(data);
          this.imageFilesEvent.emit({
              coverImage: this.finalizedImage,
              cardImage: this.finalizedCardImage,
              searchImage: this.finalizedSearchImage,
              gallery: this.finalizedGalleryImages
          })
          this.isFormValid(); //IMG VALIDATION
        }
      })
    )
  }

}
