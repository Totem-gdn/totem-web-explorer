import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { BehaviorSubject, Observable } from "rxjs";
import { AssetsABI } from './assets-abi'
import Web3 from "web3";

const clientId = environment.WEB3AUTH_ID;

@Injectable({ providedIn: 'root' })

export class AssetsListenerService {

  public assetTxState: BehaviorSubject<null | 'error' | 'success'> = new BehaviorSubject<null | 'error' | 'success'>(null);

  private web3 = new Web3('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx');

  listenTx(address: string, type: string) {
    console.log('LISTENING CONTRACT');
    const assetContract = AssetsABI;
    const contractAddress = type === 'item' ? '0xfc5654489b23379ebe98baf37ae7017130b45086' : '0xee7ff88e92f2207dbc19d89c1c9ed3f385513b35';
    const contract = new this.web3.eth.Contract(assetContract, contractAddress);

    contract.events.Transfer(
      {fromBlock: 0, toBlock: 'latest', filter: {to: address}},
      (error: any, event: any) => { console.log(event); })
    .on("connected", (subscriptionId: any) => {
        console.log(subscriptionId);
    })
    .on('data', (event: any) => {
        console.log('DATA: ', event);
        this.assetTxState.next('success');
    })
    .on('changed', (event: any) => {

    })
    .on('error', (error: any, receipt: any) => {
        console.log(error, receipt);
        this.assetTxState.next('error');
    });
  }

}
