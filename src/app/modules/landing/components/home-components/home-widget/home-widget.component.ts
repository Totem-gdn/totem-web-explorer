import { Component } from "@angular/core";
import { ComboBoxService } from "@app/core/services/combobox-state.service";


@Component({
    selector: 'home-widget',
    templateUrl: './home-widget.component.html',
    styleUrls: ['./home-widget.component.scss']
})

export class HomeWidgetComponent {
    constructor(private comboBoxService: ComboBoxService) {}
    selectGame(event: any) {
      console.log(event);

      this.comboBoxService.updateSelectedGame(event);
    }
}
