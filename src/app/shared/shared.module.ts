import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ItemCardComponent } from "./items/item-card/item-card.component";
import { ItemCardModule } from "./items/item-card/item-card.module";
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
        ItemCardModule
        
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserAvatar,
        LoadingSpinner,
        ItemCardModule
    ]
})

export class SharedModule {

}