import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StorageKey } from '@app/core/models/enums/storage-keys.enum';
import { SUBMISSION_TABS } from '@app/core/models/enums/submission-tabs.enum';
import { GameDetail, ImageEvents, ImagesInfo, ImagesToUpload, JsonDNAFilters, JsonDNAFiltersToDelete, SubmitGame, SubmitGameResponse } from '@app/core/models/interfaces/submit-game-interface.model';
import { UserStateService } from '@app/core/services/auth.service';
import { CompressImageService } from '@app/core/services/utils/compress-image.service';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ImageUploaderComponent } from './modules/image-uploader/image-uploader.component';
import { FormsService } from './services/forms.service';
import { SubmitGameService } from './services/submit-game.service';

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
  jsonFilesToUpload: JsonDNAFilters = {assetFilter: null, avatarFilter: null, gemFilter: null};
  deletedJsonFiles: JsonDNAFiltersToDelete = {assetFilter: false, avatarFilter: false, gemFilter: false};
  imageEvents!: ImageEvents | null;


  gameToEdit: { game: GameDetail | null; id: string } = { game: null, id: ''};
  editMode: boolean = false;
  galleryImagesForDelete: string[] = [];

  constructor(
    readonly matDialog: MatDialog,
    private userStateService: UserStateService,
    private formsService: FormsService,
    private submitGameService: SubmitGameService,
    private compressImageService: CompressImageService,
    private gtag: Gtag,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.gtag.event('page_view');
  }

  ngOnInit() {
    this.subs.add(
      this.route.queryParams
        .subscribe((params: Params) => {
            const editGameId = params['edit'];

            if (!editGameId) return;
            this.gameToEdit.id = editGameId;
            const selectedGame = JSON.parse(localStorage.getItem(StorageKey.SELECTED_GAME)!);
            if (!selectedGame) return;

            this.prefillSelectedGameInfo(selectedGame);
        })
    );

    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    )
    this.formsService.checkFormsValidity();
    //this.submitGameService.approveGame('635809e9d11c69a425e5ee6d');
    //this.submitGameService.deleteGame('636d8fdc92ee9a95061ceec9');
  }

  ngOnDestroy(): void {
    this.clearData();
    this.subs.unsubscribe();
  }

  // EDIT BLOCK START

  prefillSelectedGameInfo(game: GameDetail) {
    this.formsService.saveForm('general', game.general);
    this.formsService.saveForm('details', game.details);
    this.formsService.saveForm('contacts', game.contacts);
    this.formsService.saveForm('connections', game.connections);
    this.formsService.saveForm('imageUrls', game?.images);
    this.editMode = true;
  }

  // EDIT BLOCK END

  updateImages(images: ImagesInfo) {
    this.imagesToSubmit = images;
  }


  // JSON FILES
  updateJsonFile(files: JsonDNAFilters) {
    this.jsonFilesToUpload = files;
  }

  saveEvents(event: ImageEvents) {
    this.imageEvents = event;
  }

  updateFormData(event: SubmitGame) {
    let keyToUpdate: string = Object?.keys(event)[0];
    this.formsData = {
      ...this.formsData,
      [keyToUpdate]: event[keyToUpdate],
    };
  }

  uploadGame(event: any) {
    this.formsData = {
      general: this.formsService.getForm('general'),
      details: this.formsService.getForm('details'),
      contacts: this.formsService.getForm('contacts'),
      connections:
      {
        ...this.formsService.getForm('connections'),
        dnaFilters: this.filtersIsNotEmpty(this.jsonFilesToUpload) ? {
          avatarFilter: this.jsonFilesToUpload.avatarFilter ? {
            filename: this.jsonFilesToUpload.avatarFilter?.name,
            mimeType: this.jsonFilesToUpload.avatarFilter?.type,
            contentLength: this.jsonFilesToUpload.avatarFilter?.size
          } : this.deletedJsonFiles.avatarFilter == true ? null : undefined,
          assetFilter: this.jsonFilesToUpload.assetFilter ? {
            filename: this.jsonFilesToUpload.assetFilter?.name,
            mimeType: this.jsonFilesToUpload.assetFilter?.type,
            contentLength: this.jsonFilesToUpload.assetFilter?.size
          } : this.deletedJsonFiles.assetFilter == true ? null : undefined,
          gemFilter: this.jsonFilesToUpload.gemFilter ? {
            filename: this.jsonFilesToUpload.gemFilter?.name,
            mimeType: this.jsonFilesToUpload.gemFilter?.type,
            contentLength: this.jsonFilesToUpload.gemFilter?.size
          } : this.deletedJsonFiles.gemFilter == true ? null : undefined,
        } : undefined
      },
      images: this.imagesIsNotEmpty(this.imagesToSubmit!) ? this.imagesToSubmit : undefined,
      galleryImagesForDelete: this.galleryImagesForDelete && this.galleryImagesForDelete.length ? this.galleryImagesForDelete : undefined
    }

    if (!this.editMode) {
      this.postGame(this.formsData);
    } else {
      this.updateGame(this.formsData);
    }

  }

  imagesIsNotEmpty(images: ImagesInfo): boolean {
    return images?.hasOwnProperty('coverImage') || images?.hasOwnProperty('cardThumbnail') || images?.hasOwnProperty('smallThumbnail') || images?.hasOwnProperty('gallery');
  }
  filtersIsNotEmpty(filters: JsonDNAFilters): boolean {
    return filters.avatarFilter !== null || filters.assetFilter !== null || filters.gemFilter !== null ||
    this.deletedJsonFiles.avatarFilter == true || this.deletedJsonFiles.assetFilter == true || this.deletedJsonFiles.gemFilter == true;
  }

  updateGalleryImagesToDelete(gallery: string[]) {
    this.galleryImagesForDelete = gallery;
  }

  jsonFileDelete(files: JsonDNAFiltersToDelete) {
    this.deletedJsonFiles = files;
  }

  postGame(formData: SubmitGame) {
    this.subs.add(
      this.submitGameService.postGame(formData).subscribe((data: SubmitGameResponse) => {
        //this.processResponse(data);
        this.openImgUploaderDialog(this.imagesToUpload, data, this.jsonFilesToUpload);
      })
    )
  }
  updateGame(formData: SubmitGame) {
    this.subs.add(
      this.submitGameService.updateGame(formData, this.gameToEdit.id).subscribe((data: SubmitGameResponse) => {
        //this.processResponse(data);
        this.openImgUploaderDialog(this.imagesToUpload, data, this.jsonFilesToUpload);
      })
    )
  }

  //processResponse(data: SubmitGameResponse) {
  //  this.submitGameService.currentIdToUpload = data.id;
  //  this.submitGameService.componeFilesToUpload(this.imagesToUpload, data!.uploadImageURLs, data!.connections, this.jsonFilesToUpload)
  //}

  async updateImagesToUpload(data: ImagesToUpload) {
    this.imagesToUpload = data;
    const formDataToSend: ImagesInfo = {
      coverImage: this.imagesToUpload?.coverImage ? {
        mimeType: this.imagesToUpload?.coverImage?.type,
        filename: this.imagesToUpload?.coverImage?.name,
        contentLength: this.imagesToUpload?.coverImage?.size
      } : undefined,
      cardThumbnail: this.imagesToUpload?.cardImage ? {
        mimeType: this.imagesToUpload?.cardImage?.type,
        filename: this.imagesToUpload?.cardImage?.name,
        contentLength: this.imagesToUpload?.cardImage?.size
      } : undefined,
      smallThumbnail: this.imagesToUpload?.searchImage ? {
        mimeType: this.imagesToUpload?.searchImage?.type,
        filename: this.imagesToUpload?.searchImage?.name,
        contentLength: this.imagesToUpload?.searchImage?.size
      } : undefined,
      gallery:
      this.imagesToUpload?.gallery && this.imagesToUpload?.gallery?.length ?
        this.imagesToUpload?.gallery?.map((image: File) => {
          return {
            mimeType: image?.type,
            filename: image?.name,
            contentLength: image?.size
          }
        })
        :
        undefined
    }
    this.imagesToSubmit = formDataToSend;
  }

  goToTab(tab: string) {
    if (tab == SUBMISSION_TABS.BASIC_INFO) {
      this.activeTab = SUBMISSION_TABS.BASIC_INFO;
      this.progress = 33.3;
      window.scrollTo({
        top: 10,
        left: 0,
        behavior: 'smooth'
      });
    }
    if (tab == SUBMISSION_TABS.DETAILS) {
      this.activeTab = SUBMISSION_TABS.DETAILS;
      this.progress = 66.6;
      window.scrollTo({
        top: 10,
        left: 0,
        behavior: 'smooth'
      });
    }
    if (tab == SUBMISSION_TABS.LINKS) {
      this.activeTab = SUBMISSION_TABS.LINKS;
      this.progress = 100;
      window.scrollTo({
        top: 10,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  openUploadModal(imagesToUpload: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFiles: JsonDNAFilters): Observable<{redirect: boolean} | null> {
    /* const dialogType: string = type == 'cover' || 'gallery' ? 'large-dialog' : 'small-dialog';
    const aspectRation: number = type == 'cover' ? 3.5/1 : type == 'search' ? 1/1 : type == 'gallery' ? 1.78/1 : 1.33/1; */
    const options: MatDialogConfig = {
      disableClose: true,
      panelClass: 'image-upload-dialog',
      backdropClass: 'blurred-backdrop',
      data: {
        images: imagesToUpload,
        gameSubmitResponse: gameSubmitResponse,
        jsonFiles: jsonFiles
      },
      autoFocus: false
    };
    return this.matDialog.open(ImageUploaderComponent, options).afterClosed();
  }

  openImgUploaderDialog(imagesToUpload: ImagesToUpload, gameSubmitResponse: SubmitGameResponse, jsonFiles: JsonDNAFilters) {
    this.subs.add(
      this.openUploadModal(imagesToUpload, gameSubmitResponse, jsonFiles).subscribe((data: {redirect: boolean} | null) => {
        if (data?.redirect == true) {
          this.clearData();
          this.router.navigate(['/games']);
        } else {
          this.clearData();
          this.goToTab(SUBMISSION_TABS.BASIC_INFO);
        }
      })
    )
  }

  clearData() {
    this.formsService.clearFormData();
    this.jsonFilesToUpload = {assetFilter: null, avatarFilter: null, gemFilter: null};
    this.imagesToUpload = {};
    if (this.editMode) {
      localStorage.removeItem('imageUrls');
      localStorage.removeItem(StorageKey.SELECTED_GAME);
      this.editMode = false;
    }
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
