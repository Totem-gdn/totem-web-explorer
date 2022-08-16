import { Component, Input } from "@angular/core";


@Component({
    selector: 'arrow-right',
    template: `
    <div class="flex w-50px h-50px cursor-pointer bg-grey hover:bg-yellow text-light-grey hover:text-black rounded-full">
                    <mat-icon class="!w-3 m-auto" [svgIcon]="'line:arrow_right'"></mat-icon>
    </div>
    `
})

export class ArrowRight {

    @Input() bgColor = 'bg-grey';
}