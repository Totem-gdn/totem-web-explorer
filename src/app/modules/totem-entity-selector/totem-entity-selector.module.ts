import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { TotemEntitySelectorComponent } from "./totem-entity-selector.component";




@NgModule({
    declarations: [
      TotemEntitySelectorComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
      TotemEntitySelectorComponent
    ]
})

export class TotemEntitySelectorModule {

}
