import { Component, Input, OnInit, } from '@angular/core';
import { TotemItemsService } from '@app/core/services/totem-items.service';

@Component({
    selector: 'app-avatars',
    templateUrl: './avatars.component.html',
    styleUrls: ['./avatars.component.scss'],
    host: {
        class: 'px-[20px] lg:pt-[40px]'
    }
})
export class AvatarsComponent implements OnInit {
  avatars!: any[];

  constructor(private itemsService: TotemItemsService) {}

  ngOnInit(): void {

    this.itemsService.getAvatars$().subscribe(avatars => {
      this.avatars = avatars;
    })
  }
}
