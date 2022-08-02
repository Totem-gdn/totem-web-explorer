import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { Web3Service } from '@app/core/services/crypto/web3auth/web3auth.service';
import { take } from 'rxjs';

@Component({
    selector     : 'auth-sign-out',
    templateUrl  : './sign-out.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AuthSignOutComponent implements OnInit
{
    constructor(private _authService: AuthService,
                private auth3Service: Web3Service,
                private router: Router){}

    async ngOnInit()
    {
        await this.auth3Service.logout();

        this._authService.signOut().pipe(take(1)).subscribe(() => {
            this.router.navigate(['/sign-in']);
        });
    }

}
