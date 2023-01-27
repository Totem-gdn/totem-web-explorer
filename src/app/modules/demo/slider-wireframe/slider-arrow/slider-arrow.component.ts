import { Component, Input } from "@angular/core";

@Component({
    selector: 'slider-arrow',
    template: `
        <div class="wrapper b-gradient">
        <mat-icon [svgIcon]="'line:arrow_right'"
        [ngClass]="{'transform': direction == 'left'}"></mat-icon>
        </div>
    `,
    styleUrls: ['./slider-arrow.component.scss']
})

export class SliderArrowComponent {

    @Input() direction: 'left' | 'rigth' = 'rigth';
}