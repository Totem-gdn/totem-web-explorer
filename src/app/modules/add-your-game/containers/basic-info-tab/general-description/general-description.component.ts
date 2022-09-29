import { AfterViewInit, Component, ElementRef, ErrorHandler, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Tag } from "@app/core/models/tag-interface.model";
import { Animations } from "@app/core/animations/animations";
import { Subscription } from "rxjs";
import { BaseStorageService } from "@app/core/services/base-storage.service";


@Component({
    selector: 'general-description',
    templateUrl: './general-description.component.html',
    styleUrls: ['../../form-styles.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class GeneralDescription implements OnDestroy, AfterViewInit {

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

    constructor(private storage: BaseStorageService) {}

    ngAfterViewInit() {
        const controlsNames = ['gameName', 'authorName', 'briefDescription', 'genres', 'fullDescription'];

        for(let controlName of controlsNames) {
            const value = this.storage.getItem(controlName);

            if(value == null || value == '') continue;
            if(controlName != 'genres') this.generalDescription.get(controlName)?.setValue(value);
            if(controlName == 'genres') {
                const genres = value.split(',');
                for(let genre of genres) {
                    
                    this.genresForm.push(new FormControl(genre));
                }
                this.setItems = genres;
            }
        }
    }
    setItems!: any;
    
    dropdownItems = [{value: 'Comedy'}, {value: 'Horror'}, {value: 'Music'}, {value: 'Adventure'}, {value: 'Adventure'}, {value: 'Adventure'}, {value: 'Adventure'}];
    dropdownTouched = false;
    genreTags: Tag[] = [];
    genreIndexer: number = 0;

    briefDescLength = 0;
    fullDescLength = 0;

    sub!: Subscription;

    generalDescription = new FormGroup({
        gameName: new FormControl(null, [Validators.required]),
        authorName: new FormControl(null, [Validators.required]),
        briefDescription: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
        genres: new FormArray([]),
        fullDescription: new FormControl(null, [Validators.maxLength(300)]),
    })
    genresForm = this.generalDescription.get('genres') as FormArray;

    
    onSetTags(tags: any) {
        console.log(tags);
    }

    onSelectTag(tag: Tag) {
        this.genreTags.push(tag);
        this.genresForm.push(new FormControl(tag.value));
        this.saveValue('genres');
    }

    onRemoveTag(tag: Tag) {
        this.genreTags = this.genreTags.filter(genre => genre.reference != tag.reference);
        tag.reference.checked = false;
        this.genresForm.removeAt(this.genresForm.controls.findIndex(genre => genre.value === tag.value));
        this.saveValue('genres');
    }

    onRemoveGenre(genreControl: any) {
        const tagToRemove = this.genreTags.filter(tag => { return tag.value == genreControl.value});
        tagToRemove[0].reference.checked = false;

        this.genreTags = this.genreTags.filter(genre => genre.value != genreControl.value);
        this.genresForm.removeAt(this.genresForm.controls.findIndex(genre => genre.value === genreControl.value));
        this.saveValue('genres');
    }

    saveValue(controlName: string) {
        if(controlName != 'genres') {
            const value = this.generalDescription.get(controlName)?.value;
            if(value == null || value == '') {
                this.storage.removeItem(controlName);
                return;
            }
            this.storage.setItem(controlName, value);
        }
        if(controlName == 'genres') {
            const value = this.genresForm.value;
            if(value == null || value.length == 0) {
                this.storage.removeItem(controlName);
                return;
            }
            this.storage.setItem(controlName, value);
        }
    }

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

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

}