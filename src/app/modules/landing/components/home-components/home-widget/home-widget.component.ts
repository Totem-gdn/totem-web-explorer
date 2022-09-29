import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { ComboBoxService } from "@app/core/services/combobox-state.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";


const IMGS = {
  img1: '../../../../../../assets/images/widget-image-1.png',
  img2: '../../../../../../assets/images/widget-image-2.png',
  img3: '../../../../../../assets/images/widget-image-2.png',
  img4: '../../../../../../assets/images/widget-image-2.png',
}

@Component({
    selector: 'home-widget',
    templateUrl: './home-widget.component.html',
    styleUrls: ['./home-widget.component.scss'],
    animations: [
      trigger('hideFirstState', [
        state('changed', style({
          opacity: 0
        })),
        state('default', style({
          opacity: 1
        })),
        state('selected', style({
          opacity: 0
        })),
        transition('* => *', animate('1200ms linear')),
      ]),
      trigger('hideSecondState', [
        state('changed', style({
          opacity: 1
        })),
        state('default', style({
          opacity: 0
        })),
        state('selected', style({
          opacity: 0
        })),
        transition('* => *', animate('1200ms linear')),
      ]),
      trigger('hideThirdState', [
        state('selected', style({
          opacity: 1
        })),
        state('default', style({
          opacity: 0
        })),
        state('changed', style({
          opacity: 0
        })),
        transition('* => *', animate('1200ms linear')),
      ])
    ]
})

export class HomeWidgetComponent {

    //gameChanged: string = 'default';
    isChanged: boolean = false;
    userSelected: boolean = false;
    cardsToShow: any[] = [];

    testImgURL_1: string = '../../../../../../assets/images/widget-image-1.png';
    testImgURL_2: string = '../../../../../../assets/images/widget-image-2.png';

    constructor(private comboBoxService: ComboBoxService, private totemItemsService: TotemItemsService) {
      this.totemItemsService.avatars.subscribe((data: any[] | null) => {
        if (data && data.length) {
          this.cardsToShow[0] = data![0];
        }
      })
      this.totemItemsService.newestItems.subscribe((data: any[] | null) => {
        if (data && data.length) {
          this.cardsToShow[1] = data![1];
          console.log(this.cardsToShow);
        }
      })
    }
    selectGame(event: any) {
      console.log(event);

      this.comboBoxService.updateSelectedGame(event);
      this.userSelected = true;
    }

    get gameChanged() {
      return this.userSelected ? 'selected' : this.isChanged ? 'changed' : 'default';
    }

    toggle() {
      this.isChanged = !this.isChanged;
    }

    reselectGames(event: string) {
      console.log(event);
      if (!this.userSelected) this.toggle();
      if (this.userSelected) this.userSelected = false;
    }
}
