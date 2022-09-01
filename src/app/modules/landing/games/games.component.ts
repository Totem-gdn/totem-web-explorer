import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements AfterViewInit {

  @ViewChild('gamesWrapper') gamesWrapper!: ElementRef;

  games: any[] = [];

  ngAfterViewInit(): void {
      this.games.push(...[].constructor(this.gamesToRender()));
  }

  onLoadMore() {
      this.games.push(...[].constructor(this.gamesToRender()));
  }

  gamesToRender() {
      const containerWidth = this.gamesWrapper.nativeElement.offsetWidth;
      
      let gamesToRender = (Math.floor(containerWidth / 330)) * 3;
      if(gamesToRender <= 0) {
          gamesToRender = 3;
      }
      return gamesToRender;
  }
}
