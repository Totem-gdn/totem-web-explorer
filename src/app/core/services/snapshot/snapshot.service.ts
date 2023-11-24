import snapshot from '@snapshot-labs/snapshot.js';
import { Injectable } from '@angular/core';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import Web3 from 'web3';
import Client from '@snapshot-labs/snapshot.js/dist/sign';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';

import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { ethers } from 'ethers';
import { SnapshotProposal } from '@app/core/models/interfaces/snapshot.interface';

@Injectable({ providedIn: 'root' })
export class SnapshotService {
  totemSpace: string = 'totemgdn.eth';
  hub = 'https://testnet.hub.snapshot.org'; // or https://hub.snapshot.org for mainnet
  web3Client: Web3 | undefined = undefined;
  snapshotClient: Client | undefined = undefined;

  constructor(private web3: Web3AuthService) {}

  initWeb3AndSnapshotClient() {
    this.web3Client = new Web3(this.web3.provider as any);
    this.snapshotClient = new snapshot.Client712(this.hub);
  }

  async joinASpace() {
    if (!this.snapshotClient || !this.web3Client) return;
    const web3 = new Web3Provider(this.web3Client?.currentProvider as ExternalProvider);
    const [account]: string[] = await web3.listAccounts();
    console.log(account);
    const receipt = await this.snapshotClient.follow(web3, account, {
      space: this.totemSpace,
    });
    console.log(receipt);
  }

  async castAVote(proposal: SnapshotProposal, choice: number) {
    if (!this.snapshotClient || !this.web3Client) return;
    const web3 = new Web3Provider(this.web3Client?.currentProvider as ExternalProvider);
    const [account]: string[] = await web3.listAccounts();
    console.log(account);
    const receipt = await this.snapshotClient.vote(web3, account, {
      space: this.totemSpace,
      proposal: proposal.id,
      type: proposal.type,
      choice: choice,
      app: 'totem-explorer'
    });
    console.log(receipt);
    return receipt;
  }

  async getSpaceInfo() {
    this.snapshotClient?.sign
  }


}
