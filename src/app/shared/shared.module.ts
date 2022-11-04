import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NgxMaskModule } from "ngx-mask";
import { DirectivesModule } from "./directives/directives.module";
import { LoadingSpinner } from "./loading-spinner/locading-spinner.component";
import { PipesModule } from "./pipes/pipes.module";
import { TotemSpinnerModule } from "./totem-spinner/totem-spinner.module";


@NgModule({
    declarations: [
        LoadingSpinner,
        
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        NgxMaskModule.forRoot(),
        PipesModule,
        DirectivesModule,
        TotemSpinnerModule,

    ],
    exports: [
        CommonModule,
        HttpClientModule,
        NgxMaskModule,

        PipesModule,
        DirectivesModule,

        LoadingSpinner,
        TotemSpinnerModule,
    ]
})

export class SharedModule {

}
