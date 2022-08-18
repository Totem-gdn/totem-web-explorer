import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { FilterMenuModule } from "../components/filter-menu/filter-menu.module";
import { AvatarsFilterComponent } from "./avatars-filter.component";



@NgModule({
    declarations: [
        AvatarsFilterComponent
    ],
    imports: [
        SharedModule,
        FilterMenuModule,
    ],
    exports: [
        AvatarsFilterComponent
    ]
})

export class AvatarFilterModule {

}