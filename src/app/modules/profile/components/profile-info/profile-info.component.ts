import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { ProfileStateService } from '@app/core/services/states/profile-state.service';
import { BaseStorageService } from '@app/core/services/utils/base-storage.service';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  host: {
    class: 'flex'
  }
})
export class ProfileInfoComponent implements OnInit {

  wallet!: string;
  user: any;
  imageUrl: string | null = '';

  constructor(
    private web3Auth: Web3AuthService,
    private router: Router,
    private snackNotifierService: SnackNotifierService,
    private profileStateService: ProfileStateService,
    private baseStorageService: BaseStorageService,
  ) {}

  ngOnInit(): void {
    this.handleAuth();
    this.imageUrl = JSON.parse(this.baseStorageService.getItem('profile-image')!);
  }


  async handleAuth() {
    const wallet = await this.web3Auth.getAccounts();

    const userData = await this.web3Auth.getUserInfo();
    const email = userData?.email;
    const image = userData?.profileImage;
    const name = userData?.name;

    const user: any = {
      name: name,
      email: email,
      avatar: image,
      fullWallet: wallet,
      wallet: wallet.slice(0, 6) + '...' + wallet.slice(-4)
    }
    this.user = user;
  }

  notify() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

  goToMessages() {
    this.router.navigate(['profile/messages']);
  }

  goToFavourites() {
    this.router.navigate(['profile/favorites']);
  }

  setImageUrl(event: string) {
    this.baseStorageService.setItem('profile-image', JSON.stringify(event));
    this.imageUrl = event;
  }

}
