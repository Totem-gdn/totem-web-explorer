import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { SnackNotifierComponent } from "./snack-bar-notifier.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from "@angular/material/icon";
import { SnackNotifierService } from "./snack-bar-notifier.service";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    declarations: [
        SnackNotifierComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule
    ],
    exports: [
        SnackNotifierComponent
    ]
})

export class SnackNotifierModule {

}
