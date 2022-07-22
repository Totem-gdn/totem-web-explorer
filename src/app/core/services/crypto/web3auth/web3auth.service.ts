
import { Injectable } from '@angular/core';
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/web3auth';
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./evm";

const clientId = environment.CLIENT_ID;
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CryptoService } from '../crypto.service';
import { AuthService } from '@app/core/auth/auth.service';
import { UserService } from '../../user/user.service';


@Injectable({ providedIn: 'root' })

export class Auth3Service {

    web3auth: Web3Auth | null = null;
    provider: SafeEventEmitterProvider | null = null;

    constructor(private authService: AuthService,
                private userService: UserService,
                private cryptoService: CryptoService) {

    }


    initAuth3 = async () => {
        this.web3auth = new Web3Auth({
            clientId: clientId,
            chainConfig: {
              chainNamespace: CHAIN_NAMESPACES.EIP155,
              chainId: "0x13881",
              rpcTarget: "https://rpc-mumbai.maticvigil.com", // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
            },
          });
    
          const web3auth = this.web3auth;
          await web3auth.initModal();
    }

    handleAuth = async () => {
      const user = await this.getUserInfo();
      const accounts = await this.getAccounts();

      if(!user) return;
      if(!accounts) return;

      const token = user.idToken;
      const account = accounts[0];
      const email = user.email;
      const avatar = user.profileImage;
      const name = user.name;

      console.log('user: ', user);
      console.log('wallet: ', account);
      if(!token) return;
      this.authService.accessToken = token;
      this.cryptoService.publicKey = account;

      this.userService.saveUserToStorage = {
        email: email,
        avatar: avatar,
        name: name
      };
    }


    getUserInfo = async () => {
        if (!this.web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const user = await this.web3auth.getUserInfo();
        return user;
    };

    login = async () => {
        if (!this.web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3auth = this.web3auth;
        this.provider = await web3auth.connect();
    };

    get = async () => {
        await this.initAuth3();
        await this.login();
        await this.handleAuth();
    }





    getAccounts = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const userAccount = await rpc.getAccounts();
        return userAccount;
    };

    getBalance = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const balance = await rpc.getBalance();
        console.log(balance);
    };

    signMessage = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const result = await rpc.signMessage();
        console.log(result);
    };

    signTransaction = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const result = await rpc.signTransaction();
        console.log(result);
    };

    sendTransaction = async () => {
        if (!this.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(this.provider);
        const result = await rpc.signAndSendTransaction();
        console.log(result);
    };

    logout = async () => {
        if (!this.web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await this.web3auth.logout();
        this.provider = null;
        console.log("logged out");
    };

}