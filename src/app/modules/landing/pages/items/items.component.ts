import { Component, Input, OnDestroy, } from "@angular/core";
import { ItemParam } from "@app/core/models/item-param.model";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Subject, Subscription, take, takeUntil } from "rxjs";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  host: {
    class: 'px-[20px] lg:pt-[40px]'
  }
})

export class ItemsComponent implements OnDestroy {
  items!: any[];
  subs = new Subject<void>();
  constructor(private itemsService: TotemItemsService) { }

  ngOnInit(): void {
    this.fetchItems();
    this.filters$();
  }

  filters$() {
    this.itemsService.filters$.pipe(takeUntil(this.subs)).subscribe(filters => {
      this.fetchItems(filters);
    })
  }

  fetchItems(filters?: ItemParam[]) {
    this.itemsService.getItems$(filters).pipe(takeUntil(this.subs)).subscribe(items => {
      this.items = items;
    })
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();

  }
}
