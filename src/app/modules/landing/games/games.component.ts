import { Component, Input, } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  host: {
      class: 'px-[20px] sm:pt-[40px]'
  }
})
export class GamesComponent {
  @Input() games: any[] = [0,0,0,0,0,0,0];

}
