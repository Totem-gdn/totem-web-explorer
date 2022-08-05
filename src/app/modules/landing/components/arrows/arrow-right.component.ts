import { Component } from "@angular/core";


@Component({
    selector: 'arrow-right',
    template: `
    <div class="flex w-50px h-50px cursor-pointer bg-semi-grey rounded-full">
                    <mat-icon class="m-auto" [svgIcon]="'line:arrow_right'"></mat-icon>
    </div>
    `
})

export class ArrowRight {

}