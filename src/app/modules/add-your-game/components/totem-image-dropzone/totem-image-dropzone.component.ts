import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'totem-image-dropzone',
  templateUrl: './totem-image-dropzone.component.html',
  styleUrls: ['./totem-image-dropzone.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class TotemImageDropzoneComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  file!: File;
  imageUrl!: string;
  imageReader: FileReader = new FileReader();


  dzHovered: boolean = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  @Input() recommendedResolution: string = '';
  @Input() selfFill: boolean = false;
  @Input() dzMinHeight: string = '247px';
  @Input() finalizedImage!: File;
  @Input() uniqueId: string = 'file';

  @Output() finalizedFile: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['finalizedImage']) {
      if (this.finalizedImage) {
        this.imageReader.readAsDataURL(this.finalizedImage);
        this.imageReader.onload = (event: any) => { this.imageUrl = event.target.result };
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setHover() {
    if (!this.dzHovered) this.dzHovered = true;
  }

  removeHover() {
    this.dzHovered = false;
  }

  getFile(event: any) {
    console.log(typeof event);
    this.imageChangedEvent = event;
    this.file = event.target.files[0];
    console.log(this.file);
    //this.imageReader.readAsDataURL(this.file);
    //this.imageReader.onload = (event: any) => { this.imageUrl = event.target.result };
    if (this.file) {
      this.finalizedFile.next(event);
    }
    this.removeHover();
  }

}
