import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { NotFoundModule } from "./not-found/not-found.module";
import { PageNotFoundComponent } from "./page-not-found.component";
import { PageNotFoundRoutes } from "./page-not-found.routing";


@NgModule({
    declarations: [
      PageNotFoundComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(PageNotFoundRoutes),
        NotFoundModule,
        FlexLayoutModule
    ],
    exports: [
      PageNotFoundComponent
    ]
})

export class PageNotFoundModule {

}
