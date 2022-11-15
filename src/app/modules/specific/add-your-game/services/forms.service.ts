import { Injectable } from "@angular/core";
import { FormValidity, GeneralInfo, DetailsInfo, ContactsInfo, ConnectionsInfo } from "@app/core/models/interfaces/submit-game-interface.model";
import { BaseStorageService } from "@app/core/services/utils/base-storage.service";
import { BehaviorSubject } from "rxjs";


@Injectable({ providedIn: 'root' })

export class FormsService {

  private _formValidity = new BehaviorSubject<FormValidity>({ basicInfoValid: false, detailsValid: false, connectionsValid: false });

  constructor(private storage: BaseStorageService) { }

  clearFormData() {
    localStorage.removeItem('general');
    localStorage.removeItem('details');
    localStorage.removeItem('contacts');
    localStorage.removeItem('connections');
  }

  saveForm(formName: string, value: any) {
    if (formName == 'general') this.storage.setItem('general', JSON.stringify(value));
    if (formName == 'details') this.storage.setItem('details', JSON.stringify(value));
    if (formName == 'contacts') this.storage.setItem('contacts', JSON.stringify(value));
    if (formName == 'connections') this.storage.setItem('connections', JSON.stringify(value));

    // edit mode - artwork tab urls
    if (formName == 'imageUrls') this.storage.setItem('imageUrls', JSON.stringify(value));
  }

  getForm(formName: string) {
    const values = this.storage.getItem(formName);
    if (!values) return null;
    return JSON.parse(values);
  }

  tabsValidity$() {
    return this._formValidity.asObservable();
  }

  setFormValidity(formName: string, isValid: boolean) {
    const formValidity = this._formValidity.getValue();

    if (formName == 'basic-info') formValidity.basicInfoValid = isValid;
    if (formName == 'details') formValidity.detailsValid = isValid;
    if (formName == 'connections') formValidity.connectionsValid = isValid;
    this._formValidity.next(formValidity);
  }

  checkFormsValidity() {

    const formsValidity = this._formValidity.getValue();

    formsValidity.basicInfoValid = this.basicInfoValidity();
    formsValidity.detailsValid = this.detailsValidity();
    formsValidity.connectionsValid = this.connectionsValidity();
    this._formValidity.next(formsValidity);
  }

  basicInfoValidity() {
    const generalForm: GeneralInfo = this.getForm('general');
    if (!generalForm || !generalForm.genre?.length || !generalForm.author || !generalForm.name || !generalForm.genre || !generalForm.description) return false;
    const detailsForm: DetailsInfo = this.getForm('details');
    if (!detailsForm || !detailsForm.status || !detailsForm.platforms || !detailsForm.platforms?.length) return false;
    const contactsForm: ContactsInfo = this.getForm('contacts');
    if (!contactsForm || !contactsForm.email) return false;

    return true;
  }
  detailsValidity() {
    return false; // will be changed, mb we dont save imgs to storage
  }
  connectionsValidity() {
    const connectionsForm: ConnectionsInfo = this.getForm('connections');
    if(!connectionsForm || !connectionsForm.webpage) return false;
    return true;
  }
}
