import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements AfterViewInit {

  constructor(private router: Router) {}

  @Input() width = 'full';
  @Input() game: any;

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
