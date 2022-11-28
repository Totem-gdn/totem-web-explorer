import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImagesToUpload, JsonDNAFilters, SubmitGameResponse } from '@app/core/models/interfaces/submit-game-interface.model';
import { BehaviorSubject, concat, Observable } from 'rxjs';
import { SubmitGameService } from '../../services/submit-game.service';

@Component({
  selector: 'totem-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full'
  }
})
export class ImageUploaderComponent implements OnInit, OnDestroy {
  filesToUpload!: { images: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFiles?: JsonDNAFilters };
  uploadProgress: number = 0;
  filesToUploadNumber: number = 0;
  filesUploaded: number = 0;
  allImagesUploaded: boolean = false;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  zeroFilesUpdated: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ImageUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFiles?: JsonDNAFilters },
    private submitGameService: SubmitGameService,

  ) {
    this.filesToUpload = this.data;
  }

  ngOnInit() {
    this.filesToUploadNumber = (this.filesToUpload.gameSubmitResponse.uploadImageURLs?.imagesGallery &&
    this.filesToUpload.gameSubmitResponse.uploadImageURLs?.imagesGallery.length ?
    this.filesToUpload.gameSubmitResponse.uploadImageURLs?.imagesGallery.length : 0) +
    (this.filesToUpload.gameSubmitResponse.uploadImageURLs?.coverImage ? 1 : 0) +
    (this.filesToUpload.gameSubmitResponse.uploadImageURLs?.cardThumbnail ? 1 : 0) +
    (this.filesToUpload.gameSubmitResponse.uploadImageURLs?.smallThumbnail ? 1 : 0) +
    (this.data.jsonFiles?.avatarFilter ? 1 : 0) +
    (this.data.jsonFiles?.assetFilter ? 1 : 0) +
    (this.data.jsonFiles?.gemFilter ? 1 : 0);

    if (this.filesToUploadNumber == 0) {
      this.zeroFilesUpdated = true;
      this.uploadProgress = 100;
      return;
    }

    this.linkImagesToGame(this.filesToUpload);
    //this.submitGameService.approveGame(this.filesToUpload.gameSubmitResponse.id);
  }

  linkImagesToGame(data: { images: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFiles?: JsonDNAFilters }) {
    this.submitGameService.currentIdToUpload = data.gameSubmitResponse.id;
    const linkedImagesToUrlsObservable: Observable<any>[] = this.submitGameService.componeFilesToUpload(
      data.images,
      data.gameSubmitResponse.uploadImageURLs,
      data.gameSubmitResponse?.connections,
      data.jsonFiles
    );

    let progressUpdateNumber: number = 100 / this.filesToUploadNumber;
    concat(...linkedImagesToUrlsObservable).subscribe((event) => {
      if (event.type == HttpEventType.UploadProgress) {
      }
      if (event.type == HttpEventType.Response) {
        this.filesUploaded += 1;
        this.uploadProgress += progressUpdateNumber;
        if (this.filesUploaded == this.filesToUploadNumber) {
          this.uploadProgress = 100;
          this.allImagesUploaded = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
  }



}
