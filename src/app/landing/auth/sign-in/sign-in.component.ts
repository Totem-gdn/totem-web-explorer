import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '@env/environment';
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3Service } from '@app/core/services/crypto/web3auth/web3auth.service';
import { Router } from '@angular/router';


@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    styleUrls    : ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AuthSignInComponent
{

    constructor(private auth3Service: Web3Service,
                private router: Router) {

    }

    async ngOnInit() {
    }  
    
    onClickLogin = async () => {
      await this.auth3Service.initAuth3();
      await this.auth3Service.login();
      await this.auth3Service.handleAuth();
      
      this.router.navigate(['/dashboard']);

    }



}
