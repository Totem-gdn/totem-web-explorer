import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss']
})
export class AvatarsComponent implements AfterViewInit {

  @ViewChild('gamesWrapper') gamesWrapper!: ElementRef;

  avatars: any[] = [];

  ngAfterViewInit(): void {
      this.avatars.push(...[].constructor(this.avatarsToRender()));
  }

  onLoadMore() {
      this.avatars.push(...[].constructor(this.avatarsToRender()));
  }

  avatarsToRender() {
      const containerWidth = this.gamesWrapper.nativeElement.offsetWidth;
      
      let avatarsToRender = (Math.floor(containerWidth / 330)) * 3;
      if(avatarsToRender <= 0) {
          avatarsToRender = 3;
      }
      return avatarsToRender;
  }
}
