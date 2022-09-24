import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'totem-preview-search-card',
  templateUrl: './preview-search-card.component.html',
  styleUrls: ['./preview-search-card.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class PreviewSearchCardComponent implements OnInit {

  imageUrl: any;
  @Input() finalizedImage: any;
  imageReader: FileReader = new FileReader();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['finalizedImage']) {
      if (this.finalizedImage) {
        this.imageReader.readAsDataURL(this.finalizedImage);
        this.imageReader.onload = (event: any) => { this.imageUrl = event.target.result };
      }
    }
  }

  constructor() {
  }

  ngOnInit() {
  }


}
