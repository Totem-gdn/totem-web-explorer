import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinner } from "./loading-spinner/locading-spinner.component";
import { UserAvatar } from "./user-avatar/user.avatar.component";


@NgModule({
    declarations: [
        UserAvatar,
        LoadingSpinner,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserAvatar,
        LoadingSpinner,
    ]
})

export class SharedModule {

}