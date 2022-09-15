import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserStateService } from './core/services/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
  class: 'flex flex-auto w-full'
  }
})
export class AppComponent {
  title = 'totem-gdn-layout';

  static isBrowser = new BehaviorSubject<boolean | null>(null);

  constructor(private userStateService: UserStateService, @Inject(PLATFORM_ID) private platformId: any) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
    this.userStateService.initAccount();
  }

}
