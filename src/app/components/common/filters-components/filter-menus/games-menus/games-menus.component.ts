import { Component } from "@angular/core";
import { INPUT_TYPE } from "@app/core/models/enums/input-type.enum";

@Component({
    selector: 'games-menus',
    templateUrl: './games-menus.component.html'
})

export class GamesMenusComponent {
    get inputType() { return INPUT_TYPE }
    
    
}