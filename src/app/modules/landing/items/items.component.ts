import { Component, Input, } from "@angular/core";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
    host: {
        class: 'px-[20px]'
      }
})

export class ItemsComponent {
  @Input() items: any[] = [0,0,0,0,0,0,0];


}
