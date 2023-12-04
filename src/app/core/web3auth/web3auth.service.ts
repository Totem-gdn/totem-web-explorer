import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { CHAIN_NAMESPACES, OPENLOGIN_NETWORK, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { BehaviorSubject, Observable } from "rxjs";
import Web3 from "web3";
import RPC from "./web3RPC";
const clientId = environment.WEB3AUTH_ID;

@Injectable({ providedIn: 'root' })

export class Web3AuthService {
    web3auth: Web3Auth | null = null;
    provider: SafeEventEmitterProvider | null = null;
    isModalLoaded = false;
    usdcClaimed: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    maticClaimed: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    web3!: Web3;

    init = async () => {
        this.web3auth = new Web3Auth({
            clientId,
            web3AuthNetwork: OPENLOGIN_NETWORK.MAINNET,
            chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: "0x13881",
                rpcTarget: "https://rpc-mumbai.maticvigil.com"
            },
        });

        const web3auth = this.web3auth;

        await web3auth.initModal();

        document.getElementById('w3a-container')!.style.visibility = 'hidden';

        if (web3auth.provider) {
            this.provider = web3auth.provider;
        }

        this.isModalLoaded = true;
    }

    login = async () => {
        // await this.init();
        if (!this.web3auth) {
            return;
        }
        const web3auth = this.web3auth;
        document.getElementById('w3a-container')!.style.visibility = 'visible';

        this.provider = await web3auth.connect();
        console.warn('connect')
        document.getElementById('w3a-container')!.style.visibility = 'hidden';
    };

    walletJWTToken = async() => {
        if(!this.web3auth) return;
        const web3 = this.web3auth;
        const key = await web3.authenticateUser();

        return key.idToken;
    }

    transactionsLogs() {
        return this.web3.eth.subscribe('logs', { address: '0x0000000000000000000000000000000000001010' });
    }

    getTransaction(hash: string) {
      return this.web3.eth.getTransaction(hash, (callback: any) => callback);
    }

    isReceiptedMatic(hash: string) {
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx'));
      const interval1 = setInterval( async () => {
        await this.web3.eth.getTransactionReceipt(hash, (err: any, res: any) => {
          if (err) {
            this.maticClaimed.next('error');
            clearInterval(interval1);
          }
          if (res) {
            this.maticClaimed.next(res);
            clearInterval(interval1);
          }
        });
      }, 1000);
    }
    isReceiptedUsdc(hash: string) {
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx'));
      const interval2 = setInterval( async () => {
        await this.web3.eth.getTransactionReceipt(hash, (err: any, res: any) => {
          if (err) {
            this.usdcClaimed.next('error');
            clearInterval(interval2);
          }
          if (res) {
            this.usdcClaimed.next(res);
            clearInterval(interval2);
          }
        });
      }, 1000);
    }

    maticTransactionListener(): Observable<any> {
      return this.maticClaimed.asObservable();
    }
    usdcTransactionListener(): Observable<any> {
      return this.usdcClaimed.asObservable();
    }
    resetUsdcAndMaticResponse() {
      this.usdcClaimed.next(null);
      this.maticClaimed.next(null);
    }

    authUser = async () => {
        if (!this.provider) {
            return;
        }
        const token = await this.web3auth?.authenticateUser();
        return token;
    }

    getTokens = async () => {
        if (!this.provider) {
            return;
        }
        const rpc = new RPC(this.provider);
        const getTokens = await rpc.getTokens();
        return getTokens;
    }

    getUserInfo = async () => {
        if (!this.web3auth) {
            return;
        }
        this.web3auth.eventNames()
        const user = await this.web3auth.getUserInfo();
        return user;
    };

    getChainId = async () => {
        if (!this.provider) {
            return;
        }
    };
    getAccounts = async () => {
        if (!this.provider) {
            return;
        }
        const rpc = new RPC(this.provider);
        const address = await rpc.getAccounts();
        return address;
    };

    getBalance = async () => {
        if (!this.provider) {
            return;
        }
        const rpc = new RPC(this.provider);
        const balance = await rpc.getBalance();
        return balance;
    };

    getTokenBalance = async () => {
        if (!this.provider) {
            return;
        }
        const rpc = new RPC(this.provider);
        const checkBalance = await rpc.getTokenBalance();
        return checkBalance;
    }

    sendTransaction = async () => {
        if (!this.provider) {
            return;
        }
    };

    signMessage = async () => {
        if (!this.provider) {
            return;
        }
    };

    getPrivateKey = async () => {
        if (!this.provider) {
            return;
        }
        const rpc = new RPC(this.provider);
        const privateKey = await rpc.getPrivateKey();
        return privateKey;
    };

    logout = async () => {
        if (!this.web3auth) {
            return;
        }
        if (this.web3auth?.connected) {
          await this.web3auth?.logout();
        }
        this.provider = null;
    };

    isLoggedIn(): boolean {
        if (this.web3auth?.connected) {
            return true;
        } else {
            return false;
        }
    }
}
