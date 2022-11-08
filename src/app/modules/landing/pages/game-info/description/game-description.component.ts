import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";


@Component({
    selector: 'game-description',
    templateUrl: './game-description.component.html',
    styleUrls: ['./game-description.component.scss']
})

export class GameDescriptionComponent {

    @Input() set game(game: any) {
        this._game = game;
        this.hlImage = game?.images?.gallery[0];
        console.log(game)
    };
    @ViewChild('image') image!: ElementRef;

    _game: any;
    hlImage!: string;

    onChangeImg(image: string) {
        this.image.nativeElement.style.opacity = '0';
        setTimeout(() => {
            this.hlImage = image;
            this.image.nativeElement.style.opacity = '1';       
        }, 200)
    }

}