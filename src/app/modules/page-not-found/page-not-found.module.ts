import { NgModule } from "@angular/core";
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
    ],
    exports: [
      PageNotFoundComponent
    ]
})

export class PageNotFoundModule {

}
