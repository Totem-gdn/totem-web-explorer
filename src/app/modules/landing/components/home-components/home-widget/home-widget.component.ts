import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { ComboBoxService } from "@app/core/services/combobox-state.service";


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
        transition('changed => default', animate('1200ms linear')),
        transition('default => changed', animate('1200ms linear')),
      ]),
      trigger('hideSecondState', [
        state('changed', style({
          opacity: 1
        })),
        state('default', style({
          opacity: 0
        })),
        transition('changed => default', animate('1200ms linear')),
        transition('default => changed', animate('1200ms linear')),
      ])
    ]
})

export class HomeWidgetComponent {

    //gameChanged: string = 'default';
    isChanged: boolean = false;

    testImgURL_1: string = '../../../../../../assets/images/widget-image-1.png';
    testImgURL_2: string = '../../../../../../assets/images/widget-image-2.png';

    constructor(private comboBoxService: ComboBoxService) {}
    selectGame(event: any) {
      console.log(event);

      this.comboBoxService.updateSelectedGame(event);
    }

    get gameChanged() {
      return this.isChanged ? 'changed' : 'default';
    }

    toggle() {
      this.isChanged = !this.isChanged;
    }

    reselectGames(event: string) {
      console.log(event);
      this.toggle();
    }
}
