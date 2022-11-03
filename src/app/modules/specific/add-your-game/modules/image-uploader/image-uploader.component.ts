import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImagesToUpload, SubmitGameResponse } from '@app/core/models/interfaces/submit-game-interface.model';
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
  filesToUpload!: { images: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFile?: File | null };
  uploadProgress: number = 0;
  filesToUploadNumber: number = 0;
  filesUploaded: number = 0;
  allImagesUploaded: boolean = false;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public dialogRef: MatDialogRef<ImageUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFile?: File | null },
    private submitGameService: SubmitGameService,

  ) {
    this.filesToUpload = this.data;
  }

  ngOnInit() {
    this.filesToUploadNumber = this.filesToUpload.gameSubmitResponse.uploadImageURLs.imagesGallery!.length + 3 + (this.data.jsonFile ? 1 : 0);
    this.linkImagesToGame(this.filesToUpload);
    //this.submitGameService.approveGame(this.filesToUpload.gameSubmitResponse.id);
  }

  linkImagesToGame(data: { images: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFile?: File | null }) {
    this.submitGameService.currentIdToUpload = data.gameSubmitResponse.id;
    const linkedImagesToUrlsObservable: Observable<any>[] = this.submitGameService.componeFilesToUpload(
      data.images,
      data.gameSubmitResponse.uploadImageURLs,
      data.gameSubmitResponse?.connections,
      data.jsonFile
    );

    let progressUpdateNumber: number = 100 / this.filesToUploadNumber;
    concat(...linkedImagesToUrlsObservable).subscribe((event) => {
      if (event.type == HttpEventType.UploadProgress) {
        console.log(Math.round(100 * (event.loaded / event.total)));
      }
      if (event.type == HttpEventType.Response) {
        this.filesUploaded += 1;
        this.uploadProgress += progressUpdateNumber;
        if (this.filesUploaded == this.filesToUploadNumber) {
          console.log('ALL FILES UPLOADED');
          this.uploadProgress = 100;
          this.allImagesUploaded = true;
        }
        console.log(event);
      }
    });
  }

  ngOnDestroy(): void {
  }



}
