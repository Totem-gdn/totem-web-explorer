import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'avatar-card',
  templateUrl: './avatar-card.component.html',
  styleUrls: ['./avatar-card.component.scss'],
})
export class AvatarCardComponent implements AfterViewInit {

  @ViewChild('item') item!: ElementRef;
  @Input() width = 'auto';

  isLiked = false;

  ngAfterViewInit(): void {
    this.item.nativeElement.style.width = this.width;
  }

  onClickLike() {
    this.isLiked = !this.isLiked;
  }

}
