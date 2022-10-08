import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemParam } from '@app/core/models/item-param.model';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'user-gems',
  templateUrl: './user-gems.component.html',
  styleUrls: ['./user-gems.component.scss']
})
export class UserGemsComponent implements OnInit, OnDestroy {

  constructor(private alchemyService: AlchemyService,
              private web3Service: Web3AuthService,
              private itemsService: TotemItemsService) { }

  gems!: any[];
  subs = new Subject<void>();

  async ngOnInit() {
    this.filters$();
    this.fetchGems();
  }

  filters$() {
    this.itemsService.filters$.pipe(takeUntil(this.subs)).subscribe(filters => {
      this.fetchGems(filters);
    })
  }

  fetchGems(filters?: ItemParam[]) {
    this.itemsService.getGems$(filters).pipe(takeUntil(this.subs)).subscribe(gems => {
      this.gems = gems;
    })
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
