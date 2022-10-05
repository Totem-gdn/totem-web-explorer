import { Component, Input, } from "@angular/core";
import { TotemItemsService } from "@app/core/services/totem-items.service";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
    host: {
        class: 'px-[20px] lg:pt-[40px]'
      }
})

export class ItemsComponent {
  items!: any[];

  constructor(private itemsService: TotemItemsService) {}

  ngOnInit(): void {

    this.itemsService.getItems$().subscribe(items => {
      this.items = items;
    })
  }
}
