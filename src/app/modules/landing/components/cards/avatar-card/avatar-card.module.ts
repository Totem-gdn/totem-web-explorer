import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { AvatarCardComponent } from "./avatar-card.component";


@NgModule({
    declarations: [
        AvatarCardComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
        AvatarCardComponent
    ]
})

export class AvatarCardModule {

}