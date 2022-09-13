import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";


@Component({
    selector: 'bg-circle',
    template: 
    `
    <div #circle class="circle"></div>
    `,
    styleUrls: ['./bg-circle.component.scss'],
    host: {
        class: 'absolute'
    }
})

export class BackgroundCircleComponent implements AfterViewInit {

    @Input() width = '100px';
    @Input() background = 'green';
    @Input() move = false;
    @Input() delay = '0';
    @ViewChild('circle') circle!: ElementRef;

    ngAfterViewInit() {
        const circle = this.circle.nativeElement.style;

        circle.width = this.width;
        circle.height = this.width;
        circle.background = this.background;

        if(this.move) {
            circle.animationDelay = this.delay;
            circle.animation = 'MoveUpDown 10s linear infinite';
        }
    }
}