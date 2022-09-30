import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Animations } from '@app/core/animations/animations';
import { Tag } from '@app/core/models/tag-interface.model';
import { UserStateService } from '@app/core/services/user-state.service';
import { Subscription } from 'rxjs';
import { FormsService } from '../../forms.service';

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

  constructor(private formsService: FormsService) { }

  get webPageErrors() {
    const webPage = this.linksForm.get('webPage');
    return webPage?.errors?.['required'] && (webPage?.touched || webPage?.dirty);
  }

  dropdownLinks: any[] = [{ value: 'Twitter', url: 'https://twitter.com/' }, { value: 'Facebook', url: 'https://facebook.com/' }, { value: 'Discord', url: 'https://discrod.com/' },]

  // links: SocialLink[] = [];

  linksForm = new FormGroup({
    webPage: new FormControl(null, Validators.required),
    rendererUrl: new FormControl(null),
    videoUrl: new FormControl(null),
    socialLinks: new FormArray([new FormControl(null)])
  })
  socialLinksForm = this.linksForm.get('socialLinks') as FormArray;

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

  onAddLink() {
    this.socialLinksForm.push(new FormControl(null));
  }

  onRemoveLink(index: number) {
    this.socialLinksForm.removeAt(index);
  }

  onSelectTag(tag: Tag, i: any) {
    const url = this.urlByValue(tag.value);
    this.socialLinksForm.controls[i].patchValue(url);
    const link = this.linksForm.value.socialLinks;
    console.log(link);
  }

  urlByValue(value: string) {
    if (value === 'Twitter') return 'twitter.com/';
    if (value === 'Facebook') return 'facebook.com/';
    if (value === 'Discord') return 'discord.com/';
    return '';
  }

  saveValue() {
    const value = this.linksForm.value;
    this.formsService.saveForm('links', value);
  }

  retrieveValues() {
    const values = this.formsService.getForm('links');
    if (!values) return;

    this.linksForm.patchValue({
      webPage: values.webPage,
      rendererUrl: values.rendererUrl,
      videoUrl: values.videoUrl,
      socialLinks: values.socialLinks,

    })
  }

}
