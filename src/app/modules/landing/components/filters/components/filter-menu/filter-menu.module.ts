import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from "@app/shared/shared.module";
import { FilterMenuComponent } from "./filter-menu.component";
import {CdkAccordionModule} from '@angular/cdk/accordion';



@NgModule({
    declarations: [
        FilterMenuComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        MatExpansionModule,
        CdkAccordionModule
    ],
    exports: [
        FilterMenuComponent
    ]
})

export class FilterMenuModule {

}