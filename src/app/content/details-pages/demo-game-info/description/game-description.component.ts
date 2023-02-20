import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Animations } from "@app/core/animations/animations";
import { GameDetail, GameSlide } from "@app/core/models/interfaces/submit-game-interface.model";


@Component({
    selector: 'game-description',
    templateUrl: './game-description.component.html',
    styleUrls: ['./game-description.component.scss'],
    host: {
        class: 'max-w-[880px]'
    },
    animations: [
        Animations.animations
    ]
})

export class GameDescriptionComponent {
    toggleDropdown = false;
    @Input() set game(game: any) {
        //
        // game.connections.promoVideo = 'https://www.youtube.com/embed/gu7bzir1uFI';
        //
        this._game = game;
        const slides: GameSlide[] = [];

        if (game?.connections?.promoVideo) slides.push({ type: 'video', url: this._game?.connections?.promoVideo })
        if (game?.images?.gallery) {
            for (let slide of game?.images?.gallery) {
                slides.push({ type: 'image', url: slide });
            }
        }

        if (slides) this.hlSlide = slides[0];
        if (slides?.length) this.slides = slides;
    };
    @ViewChild('dropdown') dropdown!: ElementRef;
    @ViewChild('image') image!: ElementRef;

    _game!: GameDetail;
    slides?: GameSlide[];
    hlSlide?: GameSlide;

    onToggle() {
        this.toggleDropdown = !this.toggleDropdown;

        const dropdown: HTMLElement = this.dropdown.nativeElement;
        document.body.style.position = 'fixed';
        if (this.toggleDropdown) {
            dropdown.blur();
            dropdown.style.maxHeight = '520px';
        } else {

            dropdown.style.maxHeight = '1px';
        }
        document.body.style.position = 'static';
    }

    onChangeSlide(image: GameSlide) {

        if(image == this.hlSlide) return;
        this.image.nativeElement.style.filter = 'blur(10px)';


        setTimeout(() => {
            this.hlSlide = image;
            setTimeout(() => {
                this.image.nativeElement.style.filter = 'blur(0px)';
            }, 100)
        }, 100)
    }

}
