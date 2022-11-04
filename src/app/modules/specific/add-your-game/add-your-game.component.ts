import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SUBMISSION_TABS } from '@app/core/models/enums/submission-tabs.enum';
import { SubmitGame, ImagesToUpload, ImagesInfo, ImageEvents, SubmitGameResponse, JsonDNAFilters } from '@app/core/models/interfaces/submit-game-interface.model';
import { UserStateService } from '@app/core/services/auth.service';
import { CompressImageService } from '@app/core/services/utils/compress-image.service';
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
  activeTab: 'basic-information' | 'details' | 'links' = 'basic-information';
  formsData: SubmitGame | null = null;
  imagesToUpload!: ImagesToUpload;
  imagesToSubmit!: ImagesInfo;
  jsonFileToUpload: JsonDNAFilters = {
    gameDNA: undefined,
    itemDNA: undefined,
    avatarDNA: undefined
  };
  imageEvents!: ImageEvents | null;

  constructor(
    readonly matDialog: MatDialog,
    private userStateService: UserStateService,
    private formsService: FormsService,
    private submitGameService: SubmitGameService,
    private compressImageService: CompressImageService,
    private gtag: Gtag,
    private router: Router,
  ) {
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

  updateJsonFile(files: JsonDNAFilters) {
    console.log('TO UPLOAD JSON: ', files);

    this.jsonFileToUpload = files;
  }

  saveEvents(event: ImageEvents) {
    this.imageEvents = event;
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
        /* dnaFilter: this.jsonFileToUpload ? {
          filename: this.jsonFileToUpload!.name,
          mimeType: this.jsonFileToUpload!.type,
          contentLength: this.jsonFileToUpload!.size,  // NEED TO IMPROVE WITH BE
        } : undefined, */
        gameDnaFilter: this.jsonFileToUpload.gameDNA ? {
          filename: this.jsonFileToUpload.gameDNA!.name,
          mimeType: this.jsonFileToUpload.gameDNA!.type,
          contentLength: this.jsonFileToUpload.gameDNA!.size,
        } : undefined,
        itemDnaFilter: this.jsonFileToUpload.itemDNA ? {
          filename: this.jsonFileToUpload.itemDNA!.name,
          mimeType: this.jsonFileToUpload.itemDNA!.type,
          contentLength: this.jsonFileToUpload.itemDNA!.size,
        } : undefined,
        avatarDnaFilter: this.jsonFileToUpload.avatarDNA ? {
          filename: this.jsonFileToUpload.avatarDNA!.name,
          mimeType: this.jsonFileToUpload.avatarDNA!.type,
          contentLength: this.jsonFileToUpload.avatarDNA!.size,
        } : undefined,
        ...this.formsService.getForm('connections')
      },
      images: this.imagesToSubmit,
    }
    console.log(this.formsData);

    //this.postGame(this.formsData);
  }

  postGame(formData: SubmitGame) {
    this.subs.add(
      this.submitGameService.postGame(formData).subscribe((data: SubmitGameResponse) => {
        //this.processResponse(data);
        this.openImgUploaderDialog(this.imagesToUpload, data, this.jsonFileToUpload);
      })
    )
  }

  /* processResponse(data: SubmitGameResponse) {
    this.submitGameService.currentIdToUpload = data.id;
    this.submitGameService.componeFilesToUpload(this.imagesToUpload, data!.uploadImageURLs, data!.connections, this.jsonFileToUpload)
  } */

  async updateImagesToUpload(data: ImagesToUpload) {
    this.imagesToUpload = data;
    //console.log('IT WAS: ', data);
    //this.imagesToUpload = await this.compreseImages(data);

    console.log('IT BECAME: ', this.imagesToUpload);

    const formDataToSend: ImagesInfo = {
      coverImage: {
        mimeType: this.imagesToUpload?.coverImage?.type,
        filename: this.imagesToUpload?.coverImage?.name,
        contentLength: this.imagesToUpload?.coverImage?.size
      },
      cardThumbnail: {
        mimeType: this.imagesToUpload?.cardImage?.type,
        filename: this.imagesToUpload?.cardImage?.name,
        contentLength: this.imagesToUpload?.cardImage?.size
      },
      smallThumbnail: {
        mimeType: this.imagesToUpload?.searchImage?.type,
        filename: this.imagesToUpload?.searchImage?.name,
        contentLength: this.imagesToUpload?.searchImage?.size
      },
      gallery:
        this.imagesToUpload?.gallery?.map((image: File) => {
          return {
            mimeType: image?.type,
            filename: image?.name,
            contentLength: image?.size
          }
        })
    }
    this.imagesToSubmit = formDataToSend;
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

  openUploadModal(imagesToUpload: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFile: JsonDNAFilters | null): Observable<{redirect: boolean} | null> {
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

  openImgUploaderDialog(imagesToUpload: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFile: JsonDNAFilters | null) {
    this.subs.add(
      this.openUploadModal(imagesToUpload, gameSubmitResponse, jsonFile).subscribe((data: {redirect: boolean} | null) => {
        console.log(data);
        if (data?.redirect == true) {
          this.router.navigate(['/games']);
        } else {
          this.goToTab(SUBMISSION_TABS.BASIC_INFO);
        }
      })
    )
  }

  async compreseImages(images: ImagesToUpload): Promise<ImagesToUpload> {
    if (images.cardImage) {
      images.cardImage  = await this.compressImageService.compressImage(images.cardImage);
    }
    if (images.coverImage) {
      images.coverImage = await this.compressImageService.compressImage(images.coverImage);
    }
    if (images.searchImage) {
      images.searchImage = await this.compressImageService.compressImage(images.searchImage);
    }
    if (images.gallery && images.gallery.length) {
      const promises: Promise<File>[] = images.gallery!.map(async (file: File) => {
        return await this.compressImageService.compressImage(file);
      })

      await Promise.all(promises).then((files: File[]) => {
        images.gallery = files;
      })
    }

    return images;
  }

}
