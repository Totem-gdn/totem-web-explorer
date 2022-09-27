import { AfterViewInit, Component, ElementRef, ErrorHandler, OnDestroy, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Tag } from "@app/core/models/tag-interface.model";
import { Animations } from "@app/core/animations/animations";
import { Subscription } from "rxjs";


@Component({
    selector: 'general-description',
    templateUrl: './general-description.component.html',
    styleUrls: ['../../form-styles.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class GeneralDescription implements OnDestroy {
    get gameErrors() { 
        const gameName = this.generalDescription.get('gameName')
        return gameName?.errors && (gameName?.touched || gameName?.dirty);

    };
    get authorErrors() { 
        const authorName = this.generalDescription.get('authorName');
        return authorName?.errors && (authorName?.touched || authorName?.dirty);
    };
    briefErrors(error: string) { 
        const brief = this.generalDescription.get('briefDescription');
        if(error === 'required') {
            return brief?.errors?.['required'] && (brief?.touched || brief?.dirty);
        }
        return brief?.errors && (brief?.touched || brief?.dirty);
    };
    get fullErrors() { 
        const full = this.generalDescription.get('fullDescription');
        return full?.errors && (full?.touched || full?.dirty);
    };


    dropdownItems = [{value: 'Comedy'}, {value: 'Horror'}, {value: 'Music'}, {value: 'Adventure'}, {value: 'Adventure'}, {value: 'Adventure'}, {value: 'Adventure'}];
    dropdownTouched = false;
    genres: Tag[] = [];

    briefDescLength = 0;
    fullDescLength = 0;

    sub!: Subscription;

    generalDescription = new FormGroup({
        gameName: new FormControl(null, [Validators.required]),
        authorName: new FormControl(null, [Validators.required]),
        briefDescription: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
        fullDescription: new FormControl(null, [Validators.maxLength(300)]),
    })

    briefDescChange(e: any) {
        const length = +e.length;
        this.briefDescLength = length;
    }

    fullDescChange(e: any) {
        const length = +e.length;
        this.fullDescLength = length;
    }

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

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

}