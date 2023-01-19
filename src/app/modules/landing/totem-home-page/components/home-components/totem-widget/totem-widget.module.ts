import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../../../../../components/utils/bg-circle/bg-circle.module";
import { TotemWidgetCardComponent } from "./components/totem-widget-card/totem-widget-card.component";
import { TotemWidgetComponent } from "./totem-widget.component";


@NgModule({
    declarations: [
        TotemWidgetComponent,
        TotemWidgetCardComponent
    ],
    imports: [
        SharedModule,
        BackgroundCircleModule,
        MatIconModule,
    ],
    exports: [
        TotemWidgetComponent,
        TotemWidgetCardComponent
    ]
})

export class TotemWidgetModule {

}
