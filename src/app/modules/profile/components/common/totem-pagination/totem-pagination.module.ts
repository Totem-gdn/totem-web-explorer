import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { TotemPaginationComponent } from "./totem-pagination.component";


@NgModule({
    declarations: [
      TotemPaginationComponent
    ],
    imports: [
        SharedModule,
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,
    ],
    exports: [
      TotemPaginationComponent
    ]
})

export class TotemPaginationModule {

}
