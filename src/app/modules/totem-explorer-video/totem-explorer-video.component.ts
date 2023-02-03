import { Component, Input, OnInit } from '@angular/core';
import { HomepageBlock } from '@app/core/models/interfaces/homepage-blocks.interface';

@Component({
  selector: 'totem-explorer-video',
  templateUrl: './totem-explorer-video.component.html',
  styleUrls: ['./totem-explorer-video.component.scss']
})
export class TotemExplorerVideoComponent implements OnInit {
  @Input() promoVideo: HomepageBlock | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  goToPage() {
    window.open('https://www.youtube.com/@totem7779', '_blank');
  }

}
