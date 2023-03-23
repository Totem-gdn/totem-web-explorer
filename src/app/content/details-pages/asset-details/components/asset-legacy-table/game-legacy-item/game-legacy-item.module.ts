import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { GameLegacyItemComponent } from "./game-legacy-item.component";

@NgModule({
    declarations: [
      GameLegacyItemComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        ClipboardModule,
        RouterModule
    ],
    exports: [
      GameLegacyItemComponent
    ]
})

export class GameLegacyItemModule {

}
