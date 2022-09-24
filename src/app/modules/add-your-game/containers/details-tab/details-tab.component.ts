import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DROP_BLOCK_TYPE } from '@app/core/enums/submission-tabs.enum';
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
  file!: File;
  imageUrl!: string;
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

  constructor(readonly matDialog: MatDialog,) {
  }

  ngOnInit() {
    /* this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    ) */
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

  getFile(event: any) {
    console.log(event);
    this.file = event.target.files[0];
    console.log(this.file);
    this.imageReader.readAsDataURL(this.file);
    this.imageReader.onload = (event: any) => { this.imageUrl = event.target.result };
  }

  cropSelectedImage(event: any, type: string) {
    this.file = event;
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
        console.log(data);
        if (type == 'cover') this.finalizedImage = data;
        if (type == 'card') this.finalizedCardImage = data;
        if (type == 'search') this.finalizedSearchImage = data;
        if (type == 'gallery') this.finalizedGalleryImages.push(data);
      })
    )
  }

}
