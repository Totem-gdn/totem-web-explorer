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
