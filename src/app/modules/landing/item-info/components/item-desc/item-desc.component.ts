import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'item-desc',
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.scss'],
  host: {
    class: 'flex grow'
  }
})
export class ItemDescComponent implements OnInit {

  constructor() { }
  
  @ViewChild('playContainer') playContainer!: ElementRef;
  @Input() item!: any;
  @Input() nft!: any;

  isLiked = false;

  onClickLike() {
    this.isLiked = !this.isLiked;
  }

  ngOnInit(): void {
    
  }

}
