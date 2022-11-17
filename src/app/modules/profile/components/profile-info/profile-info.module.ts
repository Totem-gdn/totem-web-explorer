import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { FileInputModule } from "@app/components/utils/file-input/file-input.module";
import { SnackNotifierModule } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.module";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileInfoComponent } from "./profile-info.component";


@NgModule({
    declarations: [
        ProfileInfoComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        ClipboardModule,
        SnackNotifierModule,
        MatRippleModule,
        FileInputModule
    ],
    exports: [
        ProfileInfoComponent
    ],
    providers: [SnackNotifierService]
})

export class ProfileInfoModule {

}
