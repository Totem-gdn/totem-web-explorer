import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '@app/core/services/auth.service';

@Component({
  selector: 'totem-footer',
  templateUrl: './totem-footer.component.html',
  styleUrls: ['./totem-footer.component.scss']
})
export class TotemFooterComponent implements OnInit {

  constructor(private userService: UserStateService,
              private router: Router) { }

  ngOnInit(): void {
  }

  async navigateToProfile() {
    if(this.userService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    } else {
      await this.userService.login();
      this.router.navigate(['/profile']);
    }
    
  }

}
