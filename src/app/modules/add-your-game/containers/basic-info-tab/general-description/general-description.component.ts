import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Tag } from "@app/core/models/tag-interface.model";
import { Animations } from "@app/core/animations/animations";


@Component({
    selector: 'general-description',
    templateUrl: './general-description.component.html',
    styleUrls: ['../basic-info.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class GeneralDescription {
    get gameErrors() { 
        const gameName = this.generalDescription.get('gameName')
        return gameName?.errors && (gameName?.touched || gameName?.dirty);

    };
    get authorErrors() { 
        const authorName = this.generalDescription.get('authorName');
        return authorName?.errors && (authorName?.touched || authorName?.dirty);
    };
    get previewErrors() { 
        const preview = this.generalDescription.get('previewDescription');
        return preview?.errors && (preview?.touched || preview?.dirty);
    };


    dropdownItems = [{value: 'Comedy'}, {value: 'Horror'}, {value: 'Music'}, {value: 'Adventure'}, {value: 'Adventure'}, {value: 'Adventure'}, {value: 'Adventure'}];
    dropdownTouched = false;
    genres: Tag[] = [];

    generalDescription = new FormGroup({
        gameName: new FormControl(null, [Validators.required]),
        authorName: new FormControl(null, [Validators.required]),
        previewDescription: new FormControl(null, [Validators.required]),
  
    })

    onTouchDropdown() {
        this.dropdownTouched = true;
    }

    onSelectTag(tag: Tag) {
        if(tag.checked === true) {
            this.genres.push(tag);
        }
        if(tag.checked === false) {
            this.onRemoveTag(tag);
        }
    }

    onRemoveTag(tag: Tag) {
        this.genres = this.genres.filter(genre => genre.reference != tag.reference);
        tag.reference.checked = false;
    }

    

}