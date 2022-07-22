import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from '@app/core/services/crypto/items.service';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})


export class ItemsComponent implements OnInit, OnDestroy {


  constructor(private itemsService: ItemsService,
              private router: Router) { }


  items!: any[];

  sub!: Subscription;


  ngOnInit(): void {

    this.sub = this.itemsService.fetchItems().subscribe(items => {
      console.log(items);
      this.items = items;
    })

  }


  // Navigate to item description
  onClickMore(id: any) {
    if(!id) return;
    this.router.navigate(['dashboard/items/item'], {queryParams: {id: id}});
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
