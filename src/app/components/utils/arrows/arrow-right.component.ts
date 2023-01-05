import { Component, Input } from "@angular/core";


@Component({
    selector: 'arrow-right',
    template: `
    <div class="flex w-50px h-50px cursor-pointer bg-grey hover:bg-yellow text-light-grey hover:text-black rounded-full transition duration-200">
                    <div class="line-arrow_right !w-3 m-auto"></div>
    </div>
    `,
    styleUrls: ['./arrows.component.scss']
})

export class ArrowRight {

    @Input() bgColor = 'bg-grey';
}