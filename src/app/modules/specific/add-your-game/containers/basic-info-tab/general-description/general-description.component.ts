import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";
import { JsonDnaFilesUrls, JsonDNAFilters, JsonDNAFiltersToDelete } from "@app/core/models/interfaces/submit-game-interface.model";
import { Tag } from "@app/core/models/interfaces/tag-interface.model";
import { CryptoUtilsService } from "@app/core/services/crypto/crypto-utils.service";
import { FormsService } from "@app/modules/specific/add-your-game/services/forms.service";
import { Subscription } from "rxjs";
import { DropzoneError } from "../../../components/totem-image-dropzone/totem-image-dropzone.component";

@Component({
    selector: 'general-description',
    templateUrl: './general-description.component.html',
    styleUrls: ['../../form-styles.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class GeneralDescription implements OnInit, OnDestroy, AfterViewInit {

    checkErrors(controlName: string, errorType: string) {
        const control = this.generalDescription.get(controlName);
        if (errorType === 'required') {
            return control?.errors?.['required'] && (control?.touched || control?.dirty);
        }
        if (errorType === 'all') {
            return control?.errors && (control?.touched || control?.dirty);
        }
        if (errorType === 'addressValidity') {
            return control?.errors && (control?.touched || control?.dirty) ? control.errors : false;
        }
    }

    setItems!: any;

    dropdownItems = [
      {value: 'Adventure'},
      {value: 'Action'},
      {value: 'Visual Novel'},
      {value: 'Role Playing'},
      {value: 'Puzzle'},
      {value: 'Platformer'},
      {value: 'Simulation'},
      {value: 'Survival'},
      {value: 'Interactive Fiction'},
      {value: 'Shooter'},
      {value: 'Strategy'},
      {value: 'Fighting'},
      {value: 'Racing'},
      {value: 'Card Game'},
      {value: 'Educational'},
      {value: 'Rhythm'},
      {value: 'Sports'}
    ];

    dropdownTouched = false;
    genreTags: Tag[] = [];
    genreIndexer: number = 0;

    briefDescLength = 0;
    fullDescLength = 0;

    sub!: Subscription;

    @Input() deletedJsonFiles: JsonDNAFiltersToDelete = {assetFilter: false, avatarFilter: false, gemFilter: false};
    @Input() selectedJsonFiles: JsonDNAFilters = {assetFilter: null, avatarFilter: null, gemFilter: null};
    @Input() editMode: boolean = false;

    @Output() formValid = new EventEmitter<any>();
    @Output() onJsonFileSelected = new EventEmitter<any>();
    @Output() onJsonFileDelete = new EventEmitter<JsonDNAFiltersToDelete>();

    generalDescription = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        author: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
        genre: new FormArray([]),
        fullDescription: new FormControl(null, [Validators.maxLength(3000)]),
        id: new FormControl(null, Validators.required)
    })
    genresForm = this.generalDescription.get('genre') as FormArray;
    dnaFilterUrls: JsonDnaFilesUrls = {};
    dnaFilterError: DropzoneError & {type: string} = {
      message: '',
      status: false,
      type: ''
    }

    constructor(
      private formsService: FormsService,
      private cryptoUtilsService: CryptoUtilsService,
      ) { }

    ngOnInit() {
      if (this.editMode) {
        this.generalDescription = new FormGroup({
          name: new FormControl(null),
          author: new FormControl(null),
          description: new FormControl(null, [Validators.maxLength(300)]),
          genre: new FormArray([]),
          fullDescription: new FormControl(null, [Validators.maxLength(3000)]),
          id: new FormControl(null)
        })
        this.genresForm = this.generalDescription.get('genre') as FormArray;
        this.isFormValid();
      }
    }

    ngAfterViewInit() {
        this.retrieveValues();
    }

    addJsonFile(event: any, type: string) {
      const jsonFile: File = event?.target?.files[0];
      if (type == 'avatar') {
        this.selectedJsonFiles.avatarFilter = jsonFile;
      }
      if (type == 'item') {
        this.selectedJsonFiles.assetFilter = jsonFile;
      }
      if (type == 'gem') {
        this.selectedJsonFiles.gemFilter = jsonFile;
      }
      this.onJsonFileSelected.emit(this.selectedJsonFiles);
      this.isFormValid();
    }

    removeFile(type: string) {
      if (type == 'avatar') {
        this.selectedJsonFiles.avatarFilter = null;
        if (this.editMode) {
          this.deletedJsonFiles.avatarFilter = true;
        }
      }
      if (type == 'item') {
        this.selectedJsonFiles.assetFilter = null;
        if (this.editMode) {
          this.deletedJsonFiles.assetFilter = true;
        }
      }
      if (type == 'gem') {
        this.selectedJsonFiles.gemFilter = null;
        if (this.editMode) {
          this.deletedJsonFiles.gemFilter = true;
        }
      }
      this.onJsonFileDelete.emit(this.deletedJsonFiles);
      this.onJsonFileSelected.emit(this.selectedJsonFiles);
      this.isFormValid();
    }

    setError(error: DropzoneError, type: string) {
      console.log(error, type);

      this.dnaFilterError = {...error, type: type};
    }

    onSelectTag(tag: Tag) {
        this.genreTags.push(tag);
        this.genresForm.push(new FormControl(tag.value));
        this.saveValue();
    }

    onRemoveTag(tag: Tag) {
        this.genreTags = this.genreTags.filter(genre => genre.reference != tag.reference);
        tag.reference.checked = false;
        this.genresForm.removeAt(this.genresForm.controls.findIndex(genre => genre.value === tag.value));
        this.saveValue();
    }

    onRemoveGenre(genreControl: any) {
        const tagToRemove = this.genreTags.filter(tag => { return tag.value == genreControl.value });
        tagToRemove[0].reference.checked = false;

        this.genreTags = this.genreTags.filter(genre => genre.value != genreControl.value);
        this.genresForm.removeAt(this.genresForm.controls.findIndex(genre => genre.value === genreControl.value));
        this.saveValue();
    }

    isFormValid() {
        this.formValid.emit({formName: 'general', value: this.generalDescription.valid});
    }

    async isAddressValid() {
      const address = this.generalDescription.get('id')?.value;
      const isValid = await this.cryptoUtilsService.checkAddressValidity(address);
      if (!isValid) {
        this.generalDescription.get('id')?.setErrors({addressError: 'Address is not valid'})
      }
    }

    saveValue() {
        const value = this.generalDescription.value;
        this.formsService.saveForm('general', value);
        this.isFormValid();
    }
    retrieveValues() {
        if (this.editMode) {
          const filters = this.formsService.getForm('connections');
          this.dnaFilterUrls = filters.dnaFilters;
        }
        const values =  this.formsService.getForm('general');
        if(!values) return;
        this.generalDescription.patchValue({
            name: values.name,
            author: values.author,
            description: values.description,
            fullDescription: values.fullDescription,
            id: values.id
        });
        this.setItems = values.genre;
        this.isFormValid();
    }



    briefDescChange(e?: any) {
        const length = +e?.length;
        this.briefDescLength = length;
        if (length >= 300) {this.briefDescLength = 300};
    }

    fullDescChange(e?: any) {
        const length = +e?.length;
        this.fullDescLength = length;
        if (length >= 3000) {this.fullDescLength = 3000};
    }

    onTouchDropdown() {
        this.dropdownTouched = true;
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

}
