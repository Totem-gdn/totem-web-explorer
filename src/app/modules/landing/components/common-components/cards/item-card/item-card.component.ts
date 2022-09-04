import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements AfterViewInit {

  constructor(private router: Router) {}

  @ViewChild('item') item!: ElementRef;
  @Input() width = 'full';
  @Input() nft: undefined | any;

  isLiked = false;
  mouseover() {
    console.log('trigger')
  }

  ngAfterViewInit(): void {
    // this.item.nativeElement.style.width = this.width;
  }

  onClickLike() {
    console.log('like')
    this.isLiked = !this.isLiked;
  }
  
  onNavigate(address: string) {
    console.log('navigate')
    this.router.navigate(['/item-info'], { queryParams: { address:  address} });
  }

}
