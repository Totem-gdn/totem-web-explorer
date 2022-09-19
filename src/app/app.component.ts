import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Web3Auth } from '@web3auth/web3auth';
import { BehaviorSubject } from 'rxjs';
import { UserStateService } from './core/services/user-state.service';
import { Web3AuthService } from './core/web3auth/web3auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
  class: 'flex flex-auto w-full'
  }
})
export class AppComponent {

  title = 'Totem Explorer';

  static isBrowser = new BehaviorSubject<boolean | null>(null);

  constructor(private userStateService: UserStateService, @Inject(PLATFORM_ID) private platformId: any, private web3: Web3AuthService) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
    this.userStateService.initAccount();
  }

  ngOnInit() {
    // this.web3.
  }

}
