import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SUBMISSION_TABS } from '@app/core/enums/submission-tabs.enum';
import { ConnectionsInfo, ContactsInfo, DetailsInfo, GeneralInfo, ImagesInfo, ImagesToUpload, SubmitGame, SubmitGameResponse } from '@app/core/models/submit-game-interface.model';
import { UserStateService } from '@app/core/services/user-state.service';
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


  constructor(readonly matDialog: MatDialog, private userStateService: UserStateService, private formsService: FormsService, private submitGameService: SubmitGameService) {
  }

  ngOnInit() {
    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    )
    this.formsService.checkFormsValidity();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  updateImages(images: ImagesInfo) {
    console.log('TO SUBMIT: ', images);

    this.imagesToSubmit = images;
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
    /* const formData: SubmitGame = {
      general: {
        author: 'afasfa',
        name: 'Decay',
        description: 'Survival MMORP game',
        genre: ['Survival']
      },
      details: {
        status: 'in progress',
        platforms: ['Windows'],
        madeWith: 'Angular (ts)',
        session: '1h-2h',
        languages: 'eng, rus, ua',
        inputs: 'Mouse',
      },
      images: this.formsData?.images,
      connections: {
        webpage: 'https://Creators.itch.io/game',
        socialLinks: []
      },
      contacts: {
        email: 'iruaasf@afsf.asf'
      },
    }
    console.log(formData); */
    /* console.log(
      this.submitGameService.getForm('general'),
      this.submitGameService.getForm('details'),
      this.submitGameService.getForm('contacts'),
      this.submitGameService.getForm('connections'),
    ); */

    this.formsData = {
      general: this.formsService.getForm('general'),
      details: this.formsService.getForm('details'),
      contacts: this.formsService.getForm('contacts'),
      connections: this.formsService.getForm('connections'),
      images: this.imagesToSubmit,
    }
    console.log(this.formsData);

    this.postGame(this.formsData);
  }

  postGame(formData: SubmitGame) {
    this.subs.add(
      this.submitGameService.postGame(formData).subscribe((data: SubmitGameResponse) => {
        //this.processResponse(data);
        this.openImgUploaderDialog(this.imagesToUpload, data);
      })
    )
  }

  processResponse(data: SubmitGameResponse) {
    this.submitGameService.currentIdToUpload = data.id;
    this.submitGameService.componeFilesToUpload(this.imagesToUpload, data!.uploadImageURLs)
  }

  updateImagesToUpload(data: ImagesToUpload) {
    this.imagesToUpload = data;
    console.log(this.imagesToUpload);

  }

  goToTab(tab: string) {
    if (tab == SUBMISSION_TABS.BASIC_INFO) {
      this.activeTab = SUBMISSION_TABS.BASIC_INFO;
      this.progress = 33.3;
    }
    if (tab == SUBMISSION_TABS.DETAILS) {
      this.activeTab = SUBMISSION_TABS.DETAILS;
      this.progress = 66.6;
    }
    if (tab == SUBMISSION_TABS.LINKS) {
      this.activeTab = SUBMISSION_TABS.LINKS;
      this.progress = 100;
    }
  }

  openUploadModal(imagesToUpload: ImagesToUpload, gameSubmitResponse: SubmitGameResponse): Observable<string> {
    /* const dialogType: string = type == 'cover' || 'gallery' ? 'large-dialog' : 'small-dialog';
    const aspectRation: number = type == 'cover' ? 3.5/1 : type == 'search' ? 1/1 : type == 'gallery' ? 1.78/1 : 1.33/1; */
    const options: MatDialogConfig = {
        disableClose: true,
        panelClass: 'image-upload-dialog',
        backdropClass: 'blurred-backdrop',
        data: {
          images: imagesToUpload,
          gameSubmitResponse: gameSubmitResponse
        },
        autoFocus: false
    };
    return this.matDialog.open(ImageUploaderComponent, options).afterClosed();
  }

  openImgUploaderDialog(imagesToUpload: ImagesToUpload, gameSubmitResponse: SubmitGameResponse) {
    this.subs.add(
      this.openUploadModal(imagesToUpload, gameSubmitResponse).subscribe((data: any) => {
        console.log(data);
      })
    )
  }

}
