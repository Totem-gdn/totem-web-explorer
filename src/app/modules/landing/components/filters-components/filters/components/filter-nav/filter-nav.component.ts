import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ComboBoxService } from "@app/core/services/combobox-state.service";
import { FiltersService } from "@app/modules/landing/components/filters-components/services/filters.service";


@Component({
    selector: 'filter-nav',
    templateUrl: './filter-nav.component.html',
    styleUrls: ['./filter-nav.component.scss']
})


export class FilterNavComponent {
    @Input() showGameSearch = true;

    constructor(private comboBoxService: ComboBoxService) {}

    selectGame(event: any) {
      console.log(event);
      this.comboBoxService.updateSelectedGame(event);
    }

    
}
