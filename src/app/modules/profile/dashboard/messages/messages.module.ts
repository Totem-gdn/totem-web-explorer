import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileBackButtonModule } from "../../components/common/profile-back-button/profile-back-button.module";
import { TotemPaginationModule } from "../../components/common/totem-pagination/totem-pagination.module";
import { MessagesComponent } from "./messages.component";
import { MessagesRoutes } from "./messages.routing";


@NgModule({
    declarations: [
      MessagesComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(MessagesRoutes),
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,

        ProfileBackButtonModule,
        TotemPaginationModule
    ],
    exports: [
      MessagesComponent
    ]
})

export class MessagesModule {

}
