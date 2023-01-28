import { Component, ElementRef, Input, ViewChild } from "@angular/core";


@Component({
    selector: 'game-description',
    templateUrl: './game-description.component.html',
    styleUrls: ['./game-description.component.scss'],
    host: {
        class: 'max-w-[880px]'
    }
})

export class GameDescriptionComponent {
    toggleDropdown = false;
    @Input() set game(game: any) {
        this._game = game;
        this.hlImage = game?.images?.gallery[0];
    };
    @ViewChild('dropdown') dropdown!: ElementRef;
    @ViewChild('image') image!: ElementRef;

    _game: any;
    hlImage!: string;

    onToggle() {
        this.toggleDropdown = !this.toggleDropdown;

        const dropdown: HTMLElement = this.dropdown.nativeElement;
        document.body.style.position = 'fixed';
        if(this.toggleDropdown) {
            dropdown.blur();
            dropdown.style.maxHeight = '520px';
        } else {

            dropdown.style.maxHeight = '1px';
        }
        document.body.style.position = 'static';
    }

    onChangeImg(image: string) {
        this.image.nativeElement.style.opacity = '0';
        setTimeout(() => {
            this.hlImage = image;
            this.image.nativeElement.style.opacity = '1';
        }, 200)
    }

}
