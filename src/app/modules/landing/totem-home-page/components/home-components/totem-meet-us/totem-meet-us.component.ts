import { Component, Input, OnInit } from '@angular/core';
import { HomepageBlock } from '@app/core/models/interfaces/homepage-blocks.interface';

@Component({
  selector: 'totem-meet-us',
  templateUrl: './totem-meet-us.component.html',
  styleUrls: ['./totem-meet-us.component.scss']
})
export class TotemMeetUsComponent implements OnInit {
  @Input() promoVideo: HomepageBlock | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
