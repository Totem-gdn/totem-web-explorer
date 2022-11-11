import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'totem-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class PreviewCardComponent implements OnInit {

  imageUrl: any;
  @Input() finalizedImage: any;
  @Input() existingImageUrl?: string = '';
  imageReader: FileReader = new FileReader();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['finalizedImage']) {
      if (this.finalizedImage) {
        this.imageReader.readAsDataURL(this.finalizedImage);
        this.imageReader.onload = (event: any) => { this.imageUrl = event.target.result };
      } else {
        this.imageUrl = '';
      }
    }
  }

  constructor() {
  }

  ngOnInit() {
  }


}
