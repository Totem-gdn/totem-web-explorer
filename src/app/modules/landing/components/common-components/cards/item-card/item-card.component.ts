import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  constructor(private router: Router) {}

  @Input() width = 'full';
  @Input() item: any;

  isLiked = false;

  onClickLike() {
    console.log('like')
    this.isLiked = !this.isLiked;
  }
  
  onNavigate() {
    // console.log('navigate')
    // this.router.navigate(['/item-info'], { queryParams: { address:  address} });
  }

}
