import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Animations } from '@app/core/animations/animations';
import { SocialLinksInfo } from '@app/core/models/interfaces/submit-game-interface.model';
import { Tag } from '@app/core/models/interfaces/tag-interface.model';
import { Subscription } from 'rxjs';
import { FormsService } from '../../services/forms.service';

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

  constructor(private formsService: FormsService, private fb: FormBuilder) { }

  get webPageErrors() {
    const webPage = this.connectionsForm.get('webpage');
    return webPage?.errors?.['required'] && (webPage?.touched || webPage?.dirty);
  }
  get assetRendererErrors() {
    const assetRenderer = this.connectionsForm.get('assetRenderer');
    return !assetRenderer?.value ? false : !this.urlRegEx.test(assetRenderer?.value!);
  }
  get promoVideoErrors() {
    const promoVideo = this.connectionsForm.get('promoVideo');
    return !promoVideo?.value ? false : !this.urlRegEx.test(promoVideo?.value!);
  }


  @Input() editMode: boolean = false;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  dropdownLinks: any[] = [
    { value: 'Twitter', url: 'https://twitter.com/' },
    { value: 'Facebook', url: 'https://facebook.com/' },
    { value: 'Discord', url: 'https://discord.com/' },
    { value: 'Instagram', url: 'https://instagram.com/' },
    { value: 'Other', url: 'https://' }
  ]
  setItems!: any[];
  submitDisabled = true;
  urlRegEx: RegExp = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;

  sub!: Subscription;

  connectionsForm = new FormGroup({
    webpage: new FormControl(null, Validators.required),
    assetRenderer: new FormControl(null, Validators.pattern(this.urlRegEx)),
    promoVideo: new FormControl(null, Validators.pattern(this.urlRegEx)),
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
    if (this.editMode) {
      this.connectionsForm = new FormGroup({
        webpage: new FormControl(null),
        assetRenderer: new FormControl(null, Validators.pattern(this.urlRegEx)),
        promoVideo: new FormControl(null, Validators.pattern(this.urlRegEx)),
        socialLinks: new FormArray([
          new FormGroup({ type: new FormControl(null), url: new FormControl('https://') })
        ])
      })
      this.socialLinksForm = this.connectionsForm.get('socialLinks') as any;
      this.isFormValid();
    }
    this.sub = this.formsService.tabsValidity$().subscribe(tabs => {
      if (tabs.basicInfoValid && tabs.connectionsValid && tabs.detailsValid) {
        this.submitDisabled = false;
      } else {
        this.submitDisabled = true;
      }
    })
  }

  matchUrl(control: AbstractControl, index: number) {
    if (control.get('url')!.value.includes('twitter.com')) {
      this.socialLinksForm.controls[index]?.get('type').patchValue('Twitter');
      this.updateForm();
      return;
    }
    if (control.get('url')!.value.includes('facebook.com')) {
      this.socialLinksForm.controls[index]?.get('type').patchValue('Facebook');
      this.updateForm();
      return;
    }
    if (control.get('url')!.value.includes('discord')) {
      this.socialLinksForm.controls[index]?.get('type').patchValue('Discord');
      this.updateForm();
      return;
    }
    if (control.get('url')!.value.includes('instagram.com')) {
      this.socialLinksForm.controls[index]?.get('type').patchValue('Instagram');
      this.updateForm();
      return;
    }
    this.socialLinksForm.controls[index]?.get('type').patchValue('Other');
    this.updateForm();
  }

  submitGameInfo() {
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
    if (value === 'Other') return 'https://';
    return '';
  }

  updateForm() {
    let form = this.connectionsForm.value;
    let socLinksArr: any[] | undefined = (form.socialLinks as SocialLinksInfo[]).filter((link: SocialLinksInfo) => {
      return link?.type !== null && link?.url !== 'https://' && this.urlRegEx.test(link.url!);
    });
    form.socialLinks = socLinksArr;
    form.assetRenderer = form.assetRenderer ? form.assetRenderer : null;
    form.promoVideo = form.promoVideo ? form.promoVideo : null;

    const connectionsData: any = this.formsService.getForm('connections');

    let formToUpd: any = {
      ...form,
      dnaFilters: connectionsData?.dnaFilters ? connectionsData?.dnaFilters : undefined
    }

    this.formsService.saveForm('connections', formToUpd);
    this.isFormValid();
  }

  retrieveValues() {
    const values = this.formsService.getForm('connections');
    if (!values) return;

    this.connectionsForm.patchValue({
      webpage: values.webpage,
      assetRenderer: values.assetRenderer,
      promoVideo: values.promoVideo
    });

    for (let index = 0; index < values.socialLinks.length; index++) {
      const link = values.socialLinks[index];
      if (this.socialLinksForm.controls[index]) {
        this.socialLinksForm.controls[index].get('type')?.patchValue(link?.type);
        this.socialLinksForm.controls[index].get('url')?.patchValue(link?.url);
      } else {
        this.socialLinksForm.push(this.fb.group({
          type: new FormControl(link?.type),
          url: new FormControl(link?.url)
        }));
      }
    }
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
