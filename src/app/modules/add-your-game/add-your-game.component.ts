import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SUBMISSION_TABS } from '@app/core/enums/submission-tabs.enum';
import { ConnectionsInfo, ContactsInfo, DetailsInfo, GeneralInfo, ImagesInfo, ImagesToUpload, SubmitGame, SubmitGameResponse } from '@app/core/models/submit-game-interface.model';
import { UserStateService } from '@app/core/services/auth.service';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ImageUploaderComponent } from './modules/image-uploader/image-uploader.component';
import { FormsService } from './services/forms.service';
import { SubmitGameService } from './services/submit-game.service';

const BODY: SubmitGame = {

}

@Component({
  selector: 'totem-add-your-game',
  templateUrl: './add-your-game.component.html',
  styleUrls: ['./add-your-game.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class AddYourGameComponent implements OnInit, OnDestroy {



  subs: Subscription = new Subscription();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  progress: number = 33.3;
  activeTab: 'basic-information' | 'details' | 'links' = 'details';
  formsData: SubmitGame | null = null;
  imagesToUpload!: ImagesToUpload;
  imagesToSubmit!: ImagesInfo;
  jsonFileToUpload: File | null = null;

  constructor(
    readonly matDialog: MatDialog,
    private userStateService: UserStateService,
    private formsService: FormsService,
    private submitGameService: SubmitGameService,
    private gtag: Gtag) {
      gtag.event('page_view');
  }

  ngOnInit() {
    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    )
    this.formsService.checkFormsValidity();
    //this.submitGameService.approveGame('635809e9d11c69a425e5ee6d');
    //this.submitGameService.deleteGame('6357bd4abdf86cafd8392b58');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  updateImages(images: ImagesInfo) {
    console.log('TO SUBMIT: ', images);

    this.imagesToSubmit = images;
  }

  updateJsonFile(file: File) {
    console.log('TO UPLOAD JSON: ', file);

    this.jsonFileToUpload = file;
  }

  updateFormData(event: SubmitGame) {
    console.log(event);
    let keyToUpdate: string = Object?.keys(event)[0];
    this.formsData = {
      ...this.formsData,
      [keyToUpdate]: event[keyToUpdate],
    };
    console.log(this.formsData);
  }

  uploadGame(event: any) {
    this.formsData = {
      general: this.formsService.getForm('general'),
      details: this.formsService.getForm('details'),
      contacts: this.formsService.getForm('contacts'),
      connections:
      {
        dnaFilter: this.jsonFileToUpload ? {
          filename: this.jsonFileToUpload!.name,
          mimeType: this.jsonFileToUpload!.type,
          contentLength: this.jsonFileToUpload!.size,
        } : undefined,
        ...this.formsService.getForm('connections')
      },
      images: this.imagesToSubmit,
    }
    console.log(this.formsData);

    this.postGame(this.formsData);
  }

  postGame(formData: SubmitGame) {
    this.subs.add(
      this.submitGameService.postGame(formData).subscribe((data: SubmitGameResponse) => {
        //this.processResponse(data);
        this.openImgUploaderDialog(this.imagesToUpload, data, this.jsonFileToUpload);
      })
    )
  }

  processResponse(data: SubmitGameResponse) {
    this.submitGameService.currentIdToUpload = data.id;
    this.submitGameService.componeFilesToUpload(this.imagesToUpload, data!.uploadImageURLs, data!.connections, this.jsonFileToUpload)
  }

  updateImagesToUpload(data: ImagesToUpload) {
    this.imagesToUpload = data;
    console.log(this.imagesToUpload);

  }

  goToTab(tab: string) {
    if (tab == SUBMISSION_TABS.BASIC_INFO) {
      this.activeTab = SUBMISSION_TABS.BASIC_INFO;
      this.progress = 33.3;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    if (tab == SUBMISSION_TABS.DETAILS) {
      this.activeTab = SUBMISSION_TABS.DETAILS;
      this.progress = 66.6;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    if (tab == SUBMISSION_TABS.LINKS) {
      this.activeTab = SUBMISSION_TABS.LINKS;
      this.progress = 100;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  openUploadModal(imagesToUpload: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFile: File | null): Observable<string> {
    /* const dialogType: string = type == 'cover' || 'gallery' ? 'large-dialog' : 'small-dialog';
    const aspectRation: number = type == 'cover' ? 3.5/1 : type == 'search' ? 1/1 : type == 'gallery' ? 1.78/1 : 1.33/1; */
    const options: MatDialogConfig = {
        disableClose: true,
        panelClass: 'image-upload-dialog',
        backdropClass: 'blurred-backdrop',
        data: {
          images: imagesToUpload,
          gameSubmitResponse: gameSubmitResponse,
          jsonFile: jsonFile
        },
        autoFocus: false
    };
    return this.matDialog.open(ImageUploaderComponent, options).afterClosed();
  }

  openImgUploaderDialog(imagesToUpload: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFile: File | null) {
    this.subs.add(
      this.openUploadModal(imagesToUpload, gameSubmitResponse, jsonFile).subscribe((data: any) => {
        console.log(data);
      })
    )
  }

}
