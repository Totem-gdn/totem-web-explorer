import { Component, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';

@Component({
  selector: 'app-demo-items',
  templateUrl: './demo-items.component.html',
  styleUrls: ['./demo-items.component.scss'],
  host: {
    class: 'w-full'
  }
})
export class DemoItemsComponent implements OnInit {
  get assetType() { return ASSET_TYPE }

  constructor() { }

  ngOnInit(): void {
  }

}
