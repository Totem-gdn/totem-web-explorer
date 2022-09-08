import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class ProfileComponent implements OnInit {

  loading = false;
  routeValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private web3: Web3AuthService, private router: Router) {
    this.routeValue$.next(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routeValue$.next(event.url);
      }
    });
  }

  async ngOnInit() {
    console.log('INITED PROFILE PAGE');

    console.log('check login',!this.web3.isLoggedIn())
    if(!this.web3.isLoggedIn()) {
      console.log('login auth')
      //this.loading = true;
      await this.web3.init();
      await this.web3.login();
      this.loading = false;
    }
  }

}
