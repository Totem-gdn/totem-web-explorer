import { NgModule } from "@angular/core";
import { SearchFieldModule } from "@app/components/utils/search-field/search-field.module";
import { SharedModule } from "@app/shared/shared.module";
import { GameFilterMenuComponent } from "./game-filter-menu.component";


@NgModule({
    declarations: [
        GameFilterMenuComponent
    ],
    imports: [
        SharedModule,
        SearchFieldModule
    ],
    exports: [
        GameFilterMenuComponent
    ]
})

export class GameFilterMenuModule {
    
}