import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'totem-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class GalleryCardComponent implements OnInit {

  imageUrl: any;
  @Input() finalizedImage: any;
  @Input() existingImageUrl?: string = '';
  @Output() deleteImage: EventEmitter<any> = new EventEmitter();
  imageReader: FileReader = new FileReader();
  imageFile: any;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['finalizedImage']) {
      if (this.finalizedImage) {
        this.imageFile = {
          name: this.finalizedImage.name,
          size: this.finalizedImage.size / (1024 ** 2)
        }
        console.log(this.imageFile);

        this.imageReader.readAsDataURL(this.finalizedImage);
        this.imageReader.onload = (event: any) => { this.imageUrl = event.target.result };
      }
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

  removeItem(item: any) {
    this.deleteImage.emit(item);
  }

}
