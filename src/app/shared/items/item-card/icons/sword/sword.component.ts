import { Component, Input } from "@angular/core";



@Component({
    selector: 'item-sword',
    templateUrl: './sword-svgrepo-com.svg'
})


export class ItemSword {

    // shaftColor = '#F99C38;
    // shaftColor = 'black';


    @Input() handleColor = '#ED5564';

}