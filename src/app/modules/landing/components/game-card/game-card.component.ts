import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements AfterViewInit {

  @ViewChild('item') item!: ElementRef;
  @Input() itemWidth = '340px';

  isLiked = false;

  constructor() { }

  ngAfterViewInit(): void {
    this.item.nativeElement.style.width = this.itemWidth;
  }

  onClickLike() {
    this.isLiked = !this.isLiked;
  }

}
