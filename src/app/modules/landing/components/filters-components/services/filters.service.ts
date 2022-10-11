import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { TagsService } from "./tags.service";


@Injectable({providedIn: 'root'})

export class FiltersService {

    constructor(private tagsService: TagsService){}

    private isDropupOpen = new BehaviorSubject<boolean>(false);
    private _resetFilters = new EventEmitter<any>();

    private _sortBy = new BehaviorSubject<string>('newest');

    set dropupOpen(isOpen: boolean) {
        this.isDropupOpen.next(isOpen);
    }

    get dropupOpen() {
        return this.isDropupOpen.getValue();
    }

    get dropupOpen$() {
        return this.isDropupOpen.asObservable();
    }

    resetFilters() {
        this.tagsService.clear();
        this._resetFilters.emit();
    }

    onResetFilters$() {
        return this._resetFilters.asObservable();
    }

    set sort(sortName: string) {
        this._sortBy.next(sortName);
    }

    sort$() {
        return this._sortBy.asObservable();
    }

}