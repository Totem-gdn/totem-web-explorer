import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DROP_BLOCK_TYPE } from '@app/core/enums/submission-tabs.enum';
import { ImagesInfo, ImagesToUpload, SubmitGame } from '@app/core/models/submit-game-interface.model';
import { UserStateService } from '@app/core/services/user-state.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TotemCropperComponent } from '../../modules/totem-cropper/totem-cropper.component';

@Component({
  selector: 'totem-details-tab',
  templateUrl: './details-tab.component.html',
  styleUrls: ['./details-tab.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class DetailsTabComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  imageReader: FileReader = new FileReader();
  finalizedImage!: File;
  finalizedCardImage!: File;
  finalizedSearchImage!: File;
  finalizedGalleryImages: File[] = [];

  imageHover: any = {
    coverImgHovered: false,
    cardImgHovered: false,
    searchImgHovered: false,
    galleryImgHovered: false,
  };

  @Output() formDataEvent: EventEmitter<ImagesInfo> = new EventEmitter();
  @Output() imageFilesEvent: EventEmitter<ImagesToUpload> = new EventEmitter();

  constructor(readonly matDialog: MatDialog,) {
  }

  ngOnInit() {

  }

  updateFormData() {
    const formDataToSend: ImagesInfo = {
      coverImage: {
        mimeType: this.finalizedImage.type,
        filename: this.finalizedImage.name,
        contentLength: this.finalizedImage.size
      },
      cardThumbnail: {
        mimeType: this.finalizedCardImage.type,
        filename: this.finalizedCardImage.name,
        contentLength: this.finalizedCardImage.size
      },
      smallThumbnail: {
        mimeType: this.finalizedSearchImage.type,
        filename: this.finalizedSearchImage.name,
        contentLength: this.finalizedSearchImage.size
      },
      gallery:
        this.finalizedGalleryImages.map((image: File) => {
          return {
            mimeType: image.type,
            filename: image.name,
            contentLength: image.size
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
              searchImgae: this.finalizedSearchImage,
              gallery: this.finalizedGalleryImages
          })
        }
      })
    )
  }

}
