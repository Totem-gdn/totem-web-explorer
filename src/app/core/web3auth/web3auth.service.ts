import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./web3RPC";
const clientId = environment.WEB3AUTH_ID;


@Injectable({ providedIn: 'root' })

export class Web3AuthService {

    web3auth: Web3Auth | null = null;
    provider: SafeEventEmitterProvider | null = null;
    isModalLoaded = false;

    async get() {
        await this.init();
        await this.login();
    }

    init = async () => {
        this.web3auth = new Web3Auth({
            clientId,
            chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: "0x13881",
                rpcTarget: "https://rpc-mumbai.maticvigil.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
            },
        });
        const web3auth = this.web3auth;

        await web3auth.initModal();
        
        if (web3auth.provider) {
            this.provider = web3auth.provider;
        }
        this.isModalLoaded = true;
    }

    getTokens = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        console.log('Get tokens');
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
        this.provider = await web3auth.connect();
        console.log("logged in");
    };

    getUserInfo = async () => {
        if (!this.web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
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
    };

    getListOfNfts = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const tx = await rpc.getListOfNfts();
        return tx;
    }

    logout = async () => {
        if (!this.web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await this.web3auth.logout();
        this.provider = null;
        console.log("logged out");
    };

    isLoggedIn() {
        if(this.provider) {
            return true;
        } else {
            return false;
        }
    }



}
