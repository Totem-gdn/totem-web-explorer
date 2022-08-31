import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileStatsComponent } from "./profile-stats.component";


@NgModule({
    declarations: [
        ProfileStatsComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        FlexLayoutModule,
        MatIconModule,
    ],
    exports: [
        ProfileStatsComponent
    ],
})

export class ProfileStatsModule {

}
