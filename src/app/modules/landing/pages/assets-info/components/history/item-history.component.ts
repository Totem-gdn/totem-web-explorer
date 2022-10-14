import { Component, OnInit } from '@angular/core';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';

@Component({
  selector: 'item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.scss']
})
export class ItemHistoryComponent implements OnInit {

  constructor(private alchService: AlchemyService) { }

  ngOnInit(): void {
    // this.alchService.
  }

}
