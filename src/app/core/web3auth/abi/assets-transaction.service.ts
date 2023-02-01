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
    console.log('LISTENING CONTRACT');
    const assetContract = AssetsABI;
    const contractAddress = type === 'item' ? '0xfc5654489b23379ebe98baf37ae7017130b45086' : '0xee7ff88e92f2207dbc19d89c1c9ed3f385513b35';
    const contract = new this.web3.eth.Contract(assetContract, contractAddress);

    const blockNumber = await this.web3.eth.getBlockNumber();
    console.log('This is the recent block num: ', blockNumber);
    console.log('We listen the following block num: ', blockNumber - 100);

    contract.events.Transfer(
      {fromBlock: (blockNumber - 100), toBlock: 'latest', filter: {to: address}},
      (error: any, event: any) => { console.log(event); })
        .on("connected", (subscriptionId: any) => {
            console.log(subscriptionId);
        })
        .on('data', (event: any) => {
            //console.log('DATA: ', event);
            if (!event) return;
            this.processEvent(event);
        })
        .on('changed', (event: any) => {

        })
        .on('error', (error: any, receipt: any) => {
            console.log(error, receipt);
            this.assetTxState.next('error');
        });
  }

  processEvent(response: any) {
    const mintEvent: any = response;

    const currentTokenId: string = mintEvent?.returnValues?.tokenId || mintEvent?.returnValues?.['2'];
    console.log(currentTokenId, mintEvent?.returnValues?.tokenId, mintEvent?.returnValues?.['2']);

    if (this.baseStorage.getItem(StorageKey.RECENT_MINTED_TOKEN)) {
      console.log(this.baseStorage.getItem(StorageKey.RECENT_MINTED_TOKEN));
      const recentMintedToken: string = this.baseStorage.getItem(StorageKey.RECENT_MINTED_TOKEN)!;
      if (Number(currentTokenId) > Number(recentMintedToken)) {
        this.assetTxState.next('success');
        this.baseStorage.setItem(StorageKey.RECENT_MINTED_TOKEN, currentTokenId);
      }
      return;
    }

    if (currentTokenId) {
      this.assetTxState.next('success');
      this.baseStorage.setItem(StorageKey.RECENT_MINTED_TOKEN, currentTokenId);
    }
  }

}
