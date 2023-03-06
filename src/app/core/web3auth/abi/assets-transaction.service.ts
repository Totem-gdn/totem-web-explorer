import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { AssetsABI } from './assets-abi'
import Web3 from "web3";
import { BaseStorageService } from "@app/core/services/utils/base-storage.service";
import { StorageKey } from "@app/core/models/enums/storage-keys.enum";
import { BuyAssetService } from "@app/core/services/assets/buy-asset.service";
import { AssetTypeInfo } from "@app/core/models/interfaces/asset-info.model";

@Injectable({ providedIn: 'root' })

export class AssetsListenerService {

  public assetTxState: BehaviorSubject<null | 'error' | 'success'> = new BehaviorSubject<null | 'error' | 'success'>(null);
  private web3 = new Web3('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx');
  itemEthAddress: string = '';
  avatarEthAddress: string = '';

  constructor(
    private baseStorage: BaseStorageService,
    private buyAssetService: BuyAssetService,
    ) {}

  async listenTx(address: string, type: string) {
    const assetContract = AssetsABI;
    //console.log('item: ', this.itemEthAddress, '\n', 'avatar: ', this.avatarEthAddress);

    const contractAddress = type === 'item' ? this.itemEthAddress || environment.ITEM_ETH_ADDRESS : this.avatarEthAddress || environment.AVATAR_ETH_ADDRESS;
    const contract = new this.web3.eth.Contract(assetContract, contractAddress);

    const blockNumber = await this.web3.eth.getBlockNumber();

    contract.events.Transfer(
      {fromBlock: (blockNumber - 100), filter: {to: address}},
      (error: any, event: any) => {
        //console.log(event)
      })
        .on("connected", (subscriptionId: any) => {
        })
        .on('data', (event: any) => {
            if (!event) return;
            this.processEvent(event, type);
        })
        .on('changed', (event: any) => {

        })
        .on('error', (error: any, receipt: any) => {
            this.assetTxState.next('error');
        });
  }

  processEvent(response: any, type: string) {
    const mintEvent: any = response;

    const currentTokenId: string = mintEvent?.returnValues?.tokenId || mintEvent?.returnValues?.['2'];

    if (this.baseStorage.getItem(StorageKey.RECENT_MINTED_TOKEN + '-' + type)) {
      const recentMintedToken: string = this.baseStorage.getItem(StorageKey.RECENT_MINTED_TOKEN + '-' + type)!;
      if (Number(currentTokenId) > Number(recentMintedToken)) {
        this.assetTxState.next('success');
        this.baseStorage.setItem(StorageKey.RECENT_MINTED_TOKEN + '-' + type, currentTokenId);
      }
      return;
    }

    if (currentTokenId) {
      this.assetTxState.next('success');
      this.baseStorage.setItem(StorageKey.RECENT_MINTED_TOKEN + '-' + type, currentTokenId);
    }
  }

  getPriceAndContractAddress(type: 'item' | 'avatar' | 'gem'): Observable<AssetTypeInfo> {
    return this.buyAssetService.getAssetPriceAndContractAddress(type).pipe(tap((response: AssetTypeInfo) => {
      if (type === 'item') {
        this.itemEthAddress = response.contractAddress;
        //console.log('item: ', this.itemEthAddress);
      }
      if (type === 'avatar') {
        this.avatarEthAddress = response.contractAddress;
        //console.log('avatar: ', this.avatarEthAddress);
      }
    }))
  }

}
