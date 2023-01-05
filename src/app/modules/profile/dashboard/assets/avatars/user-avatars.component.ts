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
})
export class UserAvatarsComponent implements OnInit {
  get assetType() { return ASSET_TYPE }

  constructor(
    private assetsService: AssetsService,
    private web3Service: Web3AuthService
  ) { }

  sortMethod = ASSET_PARAM_LIST.LATEST;
  type = ASSET_TYPE.AVATAR;

  assets!: AssetInfo[] | null;
  setAssets!: AssetInfo[];


  async ngOnInit() {
    this.loadMoreAssets(1, this.sortMethod, true);
  }

  async loadMoreAssets(page: number, list = this.sortMethod, reset: boolean = false) {

    const wallet = await this.web3Service.getAccounts();

    this.assetsService.fetchAssets(this.type, page, list, wallet).subscribe(assets => {
      if(reset) {
        this.setAssets = assets.data;
      } else {
        this.assets = assets.data;
      }
    });
  }

  onSort(sortMethod: any) {
    this.sortMethod = sortMethod;
    this.loadMoreAssets(1, this.sortMethod, true);
  }
}
