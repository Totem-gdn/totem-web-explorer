import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, Maybe, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./web3RPC";
const clientId = environment.WEB3AUTH_ID;
import { getED25519Key } from "@toruslabs/openlogin-ed25519";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import Web3 from "web3";
import { BehaviorSubject, Observable } from "rxjs";

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
            chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: "0x13881",
                rpcTarget: "https://rpc-mumbai.maticvigil.com",
            },
        });
        const web3auth = this.web3auth;

        await web3auth.initModal();

        if (web3auth.provider) {
            this.provider = web3auth.provider;
        }
        this.isModalLoaded = true;
    }

    transactionsLogs() {
        return this.web3.eth.subscribe('logs', { address: '0x0000000000000000000000000000000000001010' });
    }

    getTransaction(hash: string) {
      return this.web3.eth.getTransaction(hash, (callback: any) => callback);
    }

    isReceiptedMatic(hash: string) {
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ws-polygon-mumbai.chainstacklabs.com'));
      const interval1 = setInterval( async () => {
        console.log("Attempting to get MATIC transaction receipt...");
        await this.web3.eth.getTransactionReceipt(hash, (err: any, res: any) => {
          if (err) {
            this.maticClaimed.next('error');
            clearInterval(interval1);
          }
          if (res) {
            console.log('found MATIC receipt', res);
            this.maticClaimed.next(res);
            clearInterval(interval1);
          }
        });
      }, 1000);
    }
    isReceiptedUsdc(hash: string) {
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ws-polygon-mumbai.chainstacklabs.com'));
      const interval2 = setInterval( async () => {
        console.log("Attempting to get USDC transaction receipt...");
        await this.web3.eth.getTransactionReceipt(hash, (err: any, res: any) => {
          if (err) {
            this.usdcClaimed.next('error');
            clearInterval(interval2);
          }
          if (res) {
            console.log('found USDC receipt', res);
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


    getPubKey = async () => {
        const web3auth = this.web3auth;
        const app_scoped_privkey: Maybe<any> = await web3auth?.provider?.request({
            method: "solanaPrivateKey",
        });
        const ed25519Key = getED25519Key(Buffer.from(app_scoped_privkey!.padStart(64, "0"), "hex"));
        const app_pub_key = ed25519Key.pk.toString("hex");
    }

    getPublicKey = async () => {
        const web3auth = this.web3auth;
        const app_scoped_privkey: Maybe<any> = await web3auth?.provider?.request({
            method: "eth_private_key", // use "private_key" for other non-evm chains
        });
        const app_pub_key = getPublicCompressed(Buffer.from(app_scoped_privkey!.padStart(64, "0"), "hex")).toString("hex");
        return app_pub_key;
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
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const getTokens = await rpc.getTokens();
        return getTokens;
    }

    login = async () => {
        if (!this.web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3auth = this.web3auth;
        document.getElementById('w3a-container')!.style.visibility = 'visible';
        this.provider = await web3auth.connect();
        document.getElementById('w3a-container')!.style.visibility = 'hidden';
    };

    getUserInfo = async () => {
        if (!this.web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        this.web3auth.eventNames()
        const user = await this.web3auth.getUserInfo();
        return user;
    };

    getChainId = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const chainId = await rpc.getChainId();
        console.log(chainId);
    };
    getAccounts = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const address = await rpc.getAccounts();
        return address;
    };

    getBalance = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const balance = await rpc.getBalance();
        return balance;
    };

    getTokenBalance = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        console.log('CheckBalance');
        const rpc = new RPC(this.provider);
        const checkBalance = await rpc.getTokenBalance();
        return checkBalance;
    }

    sendTransaction = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const receipt = await rpc.sendTransaction();
        console.log(receipt);
    };

    signMessage = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const signedMessage = await rpc.signMessage();
        console.log(signedMessage);
    };

    getPrivateKey = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const privateKey = await rpc.getPrivateKey();
        console.log(privateKey);
        return privateKey;
    };

    // getListOfNfts = async () => {
    //     if (!this.provider) {
    //         console.log("provider not initialized yet");
    //         return;
    //     }
    //     const rpc = new RPC(this.provider);
    //     const tx = await rpc.getListOfNfts();
    //     return tx;
    // }
    listenToHash(hash: string) {
        const web3 = new Web3(this.provider as any);
        console.log('hash', hash)
        setInterval(() => {
            web3.eth.getTransactionReceipt(hash, (err,res) => {
                console.log(res)
                console.log(err);
            });
        }, 1000)
    }

    logout = async () => {
        if (!this.web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await this.web3auth.logout();
        this.provider = null;
    };

    isLoggedIn() {
        if (this.provider) {
            return true;
        } else {
            return false;
        }
    }



}
