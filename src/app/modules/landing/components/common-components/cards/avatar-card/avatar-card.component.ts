import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'avatar-card',
  templateUrl: './avatar-card.component.html',
  styleUrls: ['./avatar-card.component.scss'],
})
export class AvatarCardComponent implements AfterViewInit {

  constructor(private router: Router) {}

  @ViewChild('item') item!: ElementRef;
  @Input() width = 'full';

  isLiked = false;

  ngAfterViewInit(): void {
    // this.item.nativeElement.style.width = this.width;
  }

  onClickLike() {
    this.isLiked = !this.isLiked;
  }

  onNavigate() {
    this.router.navigate(['/item-info']);
  }

}
