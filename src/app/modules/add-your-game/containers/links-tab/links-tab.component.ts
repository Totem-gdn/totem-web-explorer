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

  onSelectTag(tag: Tag, i: any) {
    console.log(this.socialLinksForm.controls)
    const url = this.urlByValue(tag.value);
    const link = this.socialLinksForm.controls[i] as FormArray;
    link.get('type')?.patchValue(tag.value);
    link.get('url')?.patchValue(url);
    // link.controls[0].patchValue(tag.value);
    // link.controls[1].patchValue(url);
    // console.log(link.controls[0].value)

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
    this.formsService.saveForm('connections', value);
    this.isFormValid();
  }

  retrieveValues() {
    const values = this.formsService.getForm('connections');
    if (!values) return;

    this.connectionsForm.patchValue({
      webpage: values.webpage,
      rendererUrl: values.rendererUrl,
      videoUrl: values.videoUrl
    })

    values.socialLinks.forEach((link: any, index: any) => {
      console.log('link',link);
      
      this.socialLinksForm.controls[index] = new FormGroup({ type: new FormControl(link?.type), url: new FormControl(link?.url)})
      console.log('form array', this.socialLinksForm.controls)
      // const linksArray = this.socialLinksForm.controls[index];
      // linksArray.get('type')?.patchValue(link.type);
      // linksArray.get('url')?.patchValue(link.url);
      // this.socialLinksForm.controls[index] = new FormGroup({ type: new FormControl(link?.type), url: new FormControl(link?.url)})
    })
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
