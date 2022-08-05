import { Component } from "@angular/core";


@Component({
    selector: 'arrow-left',
    template: `
    <div class="flex w-50px h-50px cursor-pointer bg-grey rounded-full">
                    <mat-icon class="m-auto" [svgIcon]="'line:arrow_left'"></mat-icon>
    </div>
    `
})

export class ArrowLeft {

}