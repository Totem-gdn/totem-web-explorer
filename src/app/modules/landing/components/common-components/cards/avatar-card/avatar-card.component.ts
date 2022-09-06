import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'avatar-card',
  templateUrl: './avatar-card.component.html',
  styleUrls: ['./avatar-card.component.scss'],
})
export class AvatarCardComponent {

  constructor(private router: Router) {}

  @Input() width = 'full';
  @Input() avatar: any;
  isLiked = false;


  onClickLike() {
    this.isLiked = !this.isLiked;
  }

  onNavigate() {
    this.router.navigate(['/item-info']);
  }

}
