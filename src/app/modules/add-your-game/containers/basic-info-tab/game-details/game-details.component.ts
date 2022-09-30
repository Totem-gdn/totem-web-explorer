import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";
import { DetailsInfo, SubmitGame } from "@app/core/models/submit-game-interface.model";
import { Tag } from "@app/core/models/tag-interface.model";


@Component({
    selector: 'game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['../../form-styles.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class GameDetailsComponent {
    get statusErrors() {
        const status = this.gameDetails.get('status')
        return status?.errors && (status?.touched || status?.dirty);
    };

    dropdownPlatforms = [{value: 'Windows'},{value: 'macOS'},{value: 'iOS'},{value: 'Android'}];
    dropdownTouched = false;
    platforms: Tag[] = [];

    gameDetails = new FormGroup({
        status: new FormControl('', Validators.required),
        madeWith: new FormControl(''),
        session: new FormControl(''),
        languages: new FormControl(''),
        inputs: new FormControl(''),
    })

    @Output() detailsFormDataEvent: EventEmitter<SubmitGame> = new EventEmitter();

    onTouchDropdown() {
        this.dropdownTouched = true;
    }

    emitFormData() {
      const formData: any = this.gameDetails.value;
      const platforms: string[] = this.platforms.map((tag: Tag) => tag.value);
      this.detailsFormDataEvent.emit({
        details:  {
          status: formData.status,
          madeWith: formData.madeWith,
          session: formData.session,
          languages: formData.languages,
          inputs: formData.inputs,
          platforms: platforms
        }
      });
    }

    onSelectTag(tag: Tag) {
        if(tag.checked === true) {
            this.platforms.push(tag);
        }
        if(tag.checked === false) {
            this.onRemoveTag(tag);
        }
        console.log(this.platforms);
        this.emitFormData();
    }

    onRemoveTag(tag: Tag) {
        this.platforms = this.platforms.filter(platform => platform.reference != tag.reference);
        tag.reference.checked = false;
    }

}
