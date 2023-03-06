import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ASSET_PARAM_LIST } from "@app/core/models/enums/params.enum";
import { UserStateService } from "@app/core/services/auth.service";
import { ProfileService } from "@app/core/services/profile.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject, combineLatest, map, Subject, take, takeUntil } from "rxjs";
import { CdkCopyToClipboard } from "@angular/cdk/clipboard";
import { AccountMetaBody, UserAssetCountEntity, UserEntity } from "@app/core/models/interfaces/user-interface.model";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { MyAssetsStoreService } from "@app/core/store/my-assets-store.service";
import { StoreService } from "@app/core/store/store.service";
import { environment } from "@env/environment";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { NavigationEnd, Router } from "@angular/router";

@Component({
    selector: 'my-assets',
    templateUrl: './my-assets.component.html',
    styleUrls: ['./my-assets.component.scss'],
    host: {
        class: 'w-full'
    }
})

export class MyAssetsComponent {

}
