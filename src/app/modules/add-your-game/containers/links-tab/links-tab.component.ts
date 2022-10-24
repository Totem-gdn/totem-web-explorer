import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Animations } from '@app/core/animations/animations';
import { Tag } from '@app/core/models/tag-interface.model';
import { Subscription } from 'rxjs';
import { FormsService } from '../../services/forms.service';
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

export class LinksTabComponent implements AfterViewInit, OnInit, OnDestroy {

  constructor(private formsService: FormsService) { }

  get webPageErrors() {
    const webPage = this.connectionsForm.get('webpage');
    return webPage?.errors?.['required'] && (webPage?.touched || webPage?.dirty);
  }


  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  dropdownLinks: any[] = [{ value: 'Twitter', url: 'https://twitter.com/' }, { value: 'Facebook', url: 'https://facebook.com/' }, { value: 'Discord', url: 'https://discrod.com/' }, { value: 'Instagram', url: 'https://instagram.com/' },]
  setItems!: any[];
  submitDisabled = true;

  sub!: Subscription;

  connectionsForm = new FormGroup({
    webpage: new FormControl(null, Validators.required),
    rendererUrl: new FormControl(null),
    videoUrl: new FormControl(null),
    socialLinks: new FormArray([
      // new FormArray([type: new FormControl(null), url: new FormControl('https://')])
      new FormGroup({ type: new FormControl(null), url: new FormControl('https://') })
    ])
  })
  socialLinksForm = this.connectionsForm.get('socialLinks') as any;

  ngAfterViewInit() {
    this.retrieveValues();
    // this.updateForm();
  }

  ngOnInit(): void {
    this.sub = this.formsService.tabsValidity$().subscribe(tabs => {
      if (tabs.basicInfoValid && tabs.connectionsValid && tabs.detailsValid) {
        this.submitDisabled = false;
      } else {
        this.submitDisabled = true;
      }
    })
  }

  submitGameInfo() {
    console.log('evenet');
    this.submitEvent.emit();
  }

  onAddLink() {
    this.socialLinksForm.push(new FormGroup({ type: new FormControl(null), url: new FormControl('https://') }));
    this.updateForm();
  }

  onRemoveLink(index: number) {
    this.socialLinksForm.removeAt(index);
    this.updateForm();
  }

  onSelectTag(tag: Tag, index: any) {
    const url = this.urlByValue(tag.value);
    if (this.socialLinksForm.controls[index]) {
      this.socialLinksForm.controls[index]?.get('type')?.patchValue(tag.value);
      this.socialLinksForm.controls[index]?.get('url')?.patchValue(url);
    } else {
      this.socialLinksForm.controls[index] = new FormGroup({ type: new FormControl(tag.value), url: new FormControl(url) })
    }
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
    let form = this.connectionsForm.value;

    this.formsService.saveForm('connections', form);
    this.isFormValid();
  }

  retrieveValues() {
    const values = this.formsService.getForm('connections');
    if (!values) return;

    this.connectionsForm.patchValue({
      webpage: values.webpage,
      rendererUrl: values.rendererUrl,
      videoUrl: values.videoUrl
    });

    for (let index = 0; index < values.socialLinks.length; index++) {
      const link = values.socialLinks[index];

      if (this.socialLinksForm.controls[index]) {
        this.socialLinksForm.controls[index].get('type')?.patchValue(link?.type);
        this.socialLinksForm.controls[index].get('url')?.patchValue(link?.url);
      } else {
        this.socialLinksForm.controls[index] = new FormGroup({ type: new FormControl(link.type), url: new FormControl(link.url) });
      }
    }
    console.log('form',this.connectionsForm)
    console.log('form value', this.connectionsForm?.value)
    this.updateForm();
  }

  isFormValid() {
    if (this.connectionsForm.valid) {
      this.formsService.setFormValidity('connections', true);
    } else {
      this.formsService.setFormValidity('connections', false);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
