import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxMaskModule } from "ngx-mask";
import { DirectivesModule } from "./directives/directives.module";
import { LoadingSpinner } from "./loading-spinner/locading-spinner.component";
import { PipesModule } from "./pipes/pipes.module";
import { TotemSpinnerModule } from "./totem-spinner/totem-spinner.module";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'en'
        })
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        NgxMaskModule,
        TranslateModule,

        PipesModule,
        DirectivesModule,

        LoadingSpinner,
        TotemSpinnerModule,
    ]
})

export class SharedModule {

}
