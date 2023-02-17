import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject } from "rxjs";
import { AssetsABI } from './assets-abi'
import Web3 from "web3";
import { BaseStorageService } from "@app/core/services/utils/base-storage.service";
import { StorageKey } from "@app/core/models/enums/storage-keys.enum";

@Injectable({ providedIn: 'root' })

export class AssetsListenerService {

  public assetTxState: BehaviorSubject<null | 'error' | 'success'> = new BehaviorSubject<null | 'error' | 'success'>(null);
  private web3 = new Web3('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx');

  constructor(private baseStorage: BaseStorageService) {}

  async listenTx(address: string, type: string) {
    const assetContract = AssetsABI;
    const contractAddress = type === 'item' ? environment.ITEM_ETH_ADDRESS : environment.AVATAR_ETH_ADDRESS;
    const contract = new this.web3.eth.Contract(assetContract, contractAddress);

    const blockNumber = await this.web3.eth.getBlockNumber();

    contract.events.Transfer(
      {fromBlock: (blockNumber - 100), toBlock: 'latest', filter: {to: address}},
      (error: any, event: any) => { })
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

}
