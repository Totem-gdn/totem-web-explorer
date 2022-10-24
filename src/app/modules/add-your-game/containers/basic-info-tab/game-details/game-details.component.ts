
import { AfterViewInit, Component, EventEmitter, Output } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";
import { DetailsInfo, SubmitGame } from "@app/core/models/submit-game-interface.model";
import { Tag } from "@app/core/models/tag-interface.model";
import { FormsService } from "@app/modules/add-your-game/services/forms.service";
import { SubmitGameService } from "@app/modules/add-your-game/services/submit-game.service";


@Component({
    selector: 'game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['../../form-styles.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class GameDetailsComponent implements AfterViewInit {

    get statusErrors() {
        const status = this.gameDetails.get('status')
        return status?.errors && (status?.touched || status?.dirty);
    };

    constructor(private formsService: FormsService) {}

    ngAfterViewInit(): void {
        this.retrieveValues();
    }

    dropdownPlatforms = [{value: 'Windows'},{value: 'macOS'},{value: 'iOS'},{value: 'Android'}];
    // dropdownPlatforms = [{}];

    dropdownTouched = false;
    setItems!: any;
    platformTags: Tag[] = [];

    @Output() formValid = new EventEmitter<any>();

    gameDetails = new FormGroup({
        status: new FormControl(null, Validators.required),
        platforms: new FormArray([], Validators.required),
        madeWith: new FormControl(null),
        avarageSession: new FormControl(null),
        languages: new FormControl(null),
        inputs: new FormControl(null),
    })
    platformsForm = this.gameDetails.get('platforms') as FormArray;


    onSelectTag(tag: Tag) {
        this.platformTags.push(tag);
        this.platformsForm.push(new FormControl(tag.value));
        this.saveValue();
    }

    onRemoveTag(tag: Tag) {
        this.platformTags = this.platformTags.filter(platform => platform.reference != tag.reference);
        tag.reference.checked = false;
        this.platformsForm.removeAt(this.platformsForm.controls.findIndex(platform => platform.value === tag.value));
        this.saveValue();
    }

    onRemovePlatform(genreControl: any) {
        const tagToRemove = this.platformTags.filter(tag => { return tag.value == genreControl.value });
        tagToRemove[0].reference.checked = false;

        this.platformTags = this.platformTags.filter(platform => platform.value != genreControl.value);
        this.platformsForm.removeAt(this.platformsForm.controls.findIndex(platform => platform.value === genreControl.value));
        this.saveValue();
    }

    saveValue() {
        const value = this.gameDetails.value;
        this.formsService.saveForm('details', value);
        this.isFormValid();
    }

    onTouchDropdown() {
        this.dropdownTouched = true;
    }

    retrieveValues() {
        const values = this.formsService.getForm('details');

        if(!values) return;
        this.gameDetails.patchValue({
            status: values.status,
            // platforms: values.platforms,
            madeWith: values.madeWith,
            avarageSession: values.avarageSession,
            languages: values.languages,
            inputs: values.inputs,

        });
        this.setItems = values.platforms;
        this.isFormValid();
    }

    isFormValid() {
        this.formValid.emit({formName: 'details', value: this.gameDetails.valid})
    }

}
