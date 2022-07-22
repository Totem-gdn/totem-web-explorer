import { Component, Input } from "@angular/core";



@Component({
    selector: 'item-spear',
    templateUrl: './spear-svgrepo-com.svg'
})


export class ItemSpear {

    // shaftColor = '#F99C38;
    // shaftColor = 'black';


    @Input() shaftColor = 'yellow';

}