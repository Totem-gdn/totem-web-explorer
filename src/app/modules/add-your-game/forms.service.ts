import { Injectable } from "@angular/core";
import { BaseStorageService } from "@app/core/services/base-storage.service";


@Injectable({ providedIn: 'root' })

export class FormsService {
    constructor(private storage: BaseStorageService) { }

    saveForm(formName: string, value: any) {
        if (formName == 'general') this.storage.setItem('general', JSON.stringify(value));
        if (formName == 'details') this.storage.setItem('details', JSON.stringify(value));
        if (formName == 'contacts') this.storage.setItem('contacts', JSON.stringify(value));
        if (formName == 'links') this.storage.setItem('links', JSON.stringify(value));

    }

    getForm(formName: string) {
        const values = this.storage.getItem(formName);
        if (!values) return null;
        return JSON.parse(values);
    }
}