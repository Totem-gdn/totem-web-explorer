import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  host: {
      class: 'px-[20px]'
  }
})
export class GamesComponent implements AfterViewInit {

  @ViewChild('gamesWrapper') gamesWrapper!: ElementRef;

  @Input() games: any[] = [];

  ngAfterViewChecked(): void {
    const width = this.gamesWrapper.nativeElement.offsetWidth;
    console.log(width);

    if(width > 880) {
        this.gamesWrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr 1fr';
    }
    if(width <= 880) {
        this.gamesWrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr';
    }
    if(width <= 560) {
        this.gamesWrapper.nativeElement.style.gridTemplateColumns = '1fr';
    }
}

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
