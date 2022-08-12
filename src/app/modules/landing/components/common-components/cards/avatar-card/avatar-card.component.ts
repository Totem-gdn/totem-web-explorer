import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'avatar-card',
  templateUrl: './avatar-card.component.html',
  styleUrls: ['./avatar-card.component.scss'],
})
export class AvatarCardComponent implements OnInit {

  isLiked = false;

  ngOnInit(): void {
  }

  onClickLike() {
    this.isLiked = !this.isLiked;
  }

}
