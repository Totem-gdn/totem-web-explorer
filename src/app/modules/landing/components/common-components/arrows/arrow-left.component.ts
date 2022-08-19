import { Component, Input } from "@angular/core";


@Component({
    selector: 'arrow-left',
    template: `
    <div class="flex w-50px h-50px cursor-pointer bg-grey hover:bg-yellow text-light-grey hover:text-black rounded-full transition duration-200">
                    <mat-icon class="!w-3 m-auto" [svgIcon]="'line:arrow_left'"></mat-icon>
    </div>
    `
})

export class ArrowLeft {

    @Input() bgColor = 'bg-grey';

}