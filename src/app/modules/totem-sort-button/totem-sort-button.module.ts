import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { TotemSortButtonComponent } from "./totem-sort-button.component";

@NgModule({
    declarations: [
      TotemSortButtonComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
      TotemSortButtonComponent
    ]
})

export class TotemSortButtonModule {}
