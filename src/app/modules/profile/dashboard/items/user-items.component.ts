import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ItemsService } from '@app/core/services/items/items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {

  constructor(private itemsService: ItemsService,
              private web3Service: Web3AuthService) { }
  sub!: Subscription;

  items: any[] = [];

  async ngOnInit() {
    const wallet = await this.web3Service.getAccounts();
    this.itemsService.fetchItems(wallet).subscribe(items => {
      console.log(items);
      this.items = items;
    });
  }

  ngOnDestroy () {
    this.sub?.unsubscribe();
  }

}
