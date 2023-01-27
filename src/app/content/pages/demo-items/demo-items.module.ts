import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { DemoItemsComponent } from "./demo-items.component";

@NgModule({
    declarations: [
        DemoItemsComponent
    ],
    imports: [
        SharedModule,
        
    ],
    exports: [
        DemoItemsComponent
    ]
})

export class DemoItemsModule {

}