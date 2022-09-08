import { Component } from '@angular/core';
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

  constructor(private userStateService: UserStateService) {
    this.userStateService.initAccount();
  }

}
