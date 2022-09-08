import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-avatars',
    templateUrl: './avatars.component.html',
    styleUrls: ['./avatars.component.scss'],
    host: {
        class: 'px-[20px]'
    }
})
export class AvatarsComponent implements AfterViewInit {

    @ViewChild('avatarsWrapper') avatarsWrapper!: ElementRef;

    @Input() avatars: any[] = [];

    ngAfterViewChecked(): void {
        const width = this.avatarsWrapper.nativeElement.offsetWidth;
        console.log(width);

        if (width > 880) {
            this.avatarsWrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr 1fr';
        }
        if (width <= 880) {
            this.avatarsWrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr';
        }
        if (width <= 560) {
            this.avatarsWrapper.nativeElement.style.gridTemplateColumns = '1fr';
        }
    }

    ngAfterViewInit(): void {
        this.avatars.push(...[].constructor(this.avatarsToRender()));
    }

    onLoadMore() {
        this.avatars.push(...[].constructor(this.avatarsToRender()));
    }

    avatarsToRender() {
        const containerWidth = this.avatarsWrapper.nativeElement.offsetWidth;

        let avatarsToRender = (Math.floor(containerWidth / 330)) * 3;
        if (avatarsToRender <= 0) {
            avatarsToRender = 3;
        }
        return avatarsToRender;
    }
}
