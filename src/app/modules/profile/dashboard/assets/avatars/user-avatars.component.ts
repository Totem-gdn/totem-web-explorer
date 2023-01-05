import { Component, OnDestroy, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-avatars',
  templateUrl: './user-avatars.component.html',
  styleUrls: ['./user-avatars.component.scss'],
  // host: {
  //   class: 'pb-[60px]'
  // }
})
export class UserAvatarsComponent implements OnInit {
  get assetType() { return ASSET_TYPE }

  constructor(
    private assetsService: AssetsService,
    private web3Service: Web3AuthService
  ) { }

  subs = new Subject<void>();

  sortMethod = ASSET_PARAM_LIST.MY;
  assets!: AssetInfo[] | null;
  setAssets!: AssetInfo[];


  async ngOnInit() {
    this.loadMoreAssets(1);
  }

  async loadMoreAssets(page: number, list = this.sortMethod, reset: boolean = false) {

    const wallet = await this.web3Service.getAccounts();
    console.log('wallet', wallet)

    this.assetsService.fetchAssets(ASSET_TYPE.AVATAR, page, list, wallet).subscribe(assets => {
      console.log('avatatrs', assets)
      if(reset) {
        // console.log()
        this.setAssets = assets.data;
      } else {
        this.assets = assets.data;
      }
    });
  }

  onSort(sortMethod: any) {
    this.sortMethod = sortMethod;
    this.loadMoreAssets(1, this.sortMethod);
  }
}
