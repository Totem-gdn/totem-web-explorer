
import { CdkCopyToClipboard, ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TotemEntitySliderModule } from "@app/modules/totem-entity-slider/totem-entity-slider.module";
import { SharedModule } from "@app/shared/shared.module";
import { SortByComponent } from "../components/sort-by/sort-by.component";
import { SortByModule } from "../components/sort-by/sort-by.module";
import { MyAssetsComponent } from "./my-assets.component";
import { MyAssetsRoutes } from "./my-assets.routing";

@NgModule({
    declarations: [
        MyAssetsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(MyAssetsRoutes),

        SortByModule,
        TotemEntitySliderModule,
        ClipboardModule,
        MatIconModule
    ],
    exports: [
        MyAssetsComponent
    ]
})

export class MyAssetsModule {

}