import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { ItemPropertiesComponent } from "./item-properties.component";


@NgModule({
    declarations: [
        ItemPropertiesComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        ItemPropertiesComponent
    ]
})

export class ItemPropertiesModule {

}