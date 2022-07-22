import { Component, Input } from "@angular/core";
import { AvatarService } from "@app/core/services/crypto/avatar.service";



@Component({
    selector: 'svg-avatar',
    templateUrl: './Diversity-Avatars-Avatars-Dave-grohl.svg',
})


export class UserAvatar {



    fillColor = 'transparent';
    hairColor = '#333';
    skinColor = '#e5c4bd';
    eyeColor = '#333';

    @Input() avatar: any;


    ngOnInit(): void {
        // Get avatar data
        this.hairColor = this.avatar.hairColor;
        this.skinColor = this.avatar.skinColor;
        this.eyeColor = this.avatar.eyeColor;

    }
}