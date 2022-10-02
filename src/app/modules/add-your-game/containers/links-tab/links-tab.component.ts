import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Animations } from '@app/core/animations/animations';
import { ConnectionsInfo, SubmitGame } from '@app/core/models/submit-game-interface.model';
import { Tag } from '@app/core/models/tag-interface.model';
import { UserStateService } from '@app/core/services/user-state.service';
import { Subscription } from 'rxjs';
import { FormsService } from '../../forms.service';
import { SubmitGameService } from '../../services/submit-game.service';

interface SocialLink {
  tag: Tag;
  url: string;
}
@Component({
  selector: 'totem-links-tab',
  templateUrl: './links-tab.component.html',
  styleUrls: ['./links-tab.component.scss', '../form-styles.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full'
  },
  animations: [
    Animations.animations
  ]
})

export class LinksTabComponent implements AfterViewInit {

  constructor(private submitGame: SubmitGameService) { }

  get webPageErrors() {
    const webPage = this.connectionsForm.get('webpage');
    return webPage?.errors?.['required'] && (webPage?.touched || webPage?.dirty);
  }

  dropdownLinks: any[] = [{ value: 'Twitter', url: 'https://twitter.com/' }, { value: 'Facebook', url: 'https://facebook.com/' }, { value: 'Discord', url: 'https://discrod.com/' },{ value: 'Instagram', url: 'https://instagram.com/' },]

  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  connectionsForm = new FormGroup({
    webpage: new FormControl(null , Validators.required),
    rendererUrl: new FormControl(null),
    videoUrl: new FormControl(null),
    socialLinks: new FormArray([
      new FormArray([ new FormControl(), new FormControl('https://')])
    ])
  })
  socialLinksForm = this.connectionsForm.get('socialLinks') as FormArray;

  ngAfterViewInit() {
    this.socialLinksForm.valueChanges.subscribe(() => {

      // for(let link of s)
      this.socialLinksForm.controls.forEach(link => {
        console.log('change')
        // link.patchValue('sefsge')
      })
    })
    this.retrieveValues();
  }

  submitGameInfo() {
    console.log('evenet');
    this.submitEvent.emit();
  }

  onAddLink() {
    this.socialLinksForm.push(new FormArray([ new FormControl(), new FormControl('https://')]));
    this.updateForm();
  }

  onRemoveLink(index: number) {
    this.socialLinksForm.removeAt(index);
    this.updateForm();
  }

  onSelectTag(tag: Tag, i: any) {
    const url = this.urlByValue(tag.value);
    const link = this.socialLinksForm.controls[i] as FormArray;
    link.controls[0].patchValue(tag.value);
    link.controls[1].patchValue(url);
    // const link = this.connectionsForm.value.socialLinks;
    this.updateForm();
  }

  urlByValue(value: string) {
    if (value === 'Twitter') return 'https://twitter.com/';
    if (value === 'Facebook') return 'https://facebook.com/';
    if (value === 'Discord') return 'https://discord.com/';
    if (value === 'Instagram') return 'https://instagram.com/';
    return '';
  }

  updateForm() {
    const value = this.connectionsForm.value;
    this.submitGame.saveForm('connections', value);
    console.log(value);
  }

  retrieveValues() {
    const values = this.submitGame.getForm('connections');
    if (!values) return;

    this.connectionsForm.patchValue({
      webpage: values.webpage,
      rendererUrl: values.rendererUrl,
      videoUrl: values.videoUrl
    })

    values.socialLinks.forEach((link: any, index: any) => {
      this.socialLinksForm.push(new FormArray([ new FormControl(link[0]), new FormControl(link[1])]))
    })
  }

}
