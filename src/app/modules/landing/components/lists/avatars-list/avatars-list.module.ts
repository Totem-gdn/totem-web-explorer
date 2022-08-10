import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { AvatarCardModule } from "../../avatar-card/avatar-card.module";
import { ItemCardModule } from "../../item-card/item-card.module";
import { AvatarsListComponent } from "./avatars-list.component";



@NgModule({
    declarations: [
        AvatarsListComponent
    ],
    imports: [
        SharedModule,
        AvatarCardModule,
    ],
    exports: [
        AvatarsListComponent
    ]
}) 

export class AvatarsListModule {
    
}