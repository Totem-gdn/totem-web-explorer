import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements AfterViewInit {

  @ViewChild('item') item!: ElementRef;
  @Input() width = 'full';

  isLiked = false;

  ngAfterViewInit(): void {
    this.item.nativeElement.style.width = this.width;
  }

  onClickLike() {
    this.isLiked = !this.isLiked;
  }

}
