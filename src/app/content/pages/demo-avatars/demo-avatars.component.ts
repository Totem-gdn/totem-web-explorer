import { Component, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';

@Component({
  selector: 'app-demo-avatars',
  templateUrl: './demo-avatars.component.html',
  styleUrls: ['./demo-avatars.component.scss'],
  host: {
    class: 'w-full'
  }
})
export class DemoAvatarsComponent implements OnInit {
  get assetType() { return ASSET_TYPE }
  constructor() { }

  ngOnInit(): void {
  }

}
