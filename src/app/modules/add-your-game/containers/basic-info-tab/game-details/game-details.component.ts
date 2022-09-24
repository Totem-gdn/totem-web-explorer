import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";
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
        status: new FormControl(null, Validators.required),
        madeWith: new FormControl(null),
        session: new FormControl(null),
        languages: new FormControl(null),
        inputs: new FormControl(null), 
    })

    onTouchDropdown() {
        this.dropdownTouched = true;
    }

    onSelectTag(tag: Tag) {
        if(tag.checked === true) {
            this.platforms.push(tag);
        }
        if(tag.checked === false) {
            this.onRemoveTag(tag);
        }
        console.log(this.platforms);
    }

    onRemoveTag(tag: Tag) {
        this.platforms = this.platforms.filter(platform => platform.reference != tag.reference);
        tag.reference.checked = false;
    }

}