import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements AfterViewInit {

  @ViewChild('item') item!: ElementRef;

  isLiked = false;

  constructor() { }

  ngAfterViewInit(): void {
  }

  onClickLike() {
    this.isLiked = !this.isLiked;
  }

}
