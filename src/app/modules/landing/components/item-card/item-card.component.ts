import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  constructor() { }

  isLiked = false;

  ngOnInit(): void {
  }

  onClickLike() {
    this.isLiked = !this.isLiked;
  }

}
