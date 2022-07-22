import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarService } from '@app/core/services/crypto/avatar.service';
import { UserService } from '@app/core/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    class: 'h-full'
  }
})
export class ProfileComponent implements OnInit {

  constructor(private avatarService: AvatarService,
    private userService: UserService,
    private router: Router) { }

  avatars!: any[];
  items: any;
  user: any;
  currentItem!: any;

  sub!: Subscription;


  ngOnInit(): void {

    // Fetch avatars
    this.avatarService.fetchAvatars().subscribe(avatars => {
      console.log(avatars[0]);
      this.avatars = avatars;
    })

    // Subscribe to user changes
    this.sub = this.userService.user$.subscribe(user => {
      this.user = user;
    })
  }


  // Navigate to avatar description and pass query
  onClickAvatar(id: any) {
    console.log('avatar id', id);
    if (!id) return;

    this.router.navigate(['dashboard/profile/avatar'], { queryParams: { id: id } });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
