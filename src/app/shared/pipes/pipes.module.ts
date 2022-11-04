import { NgModule } from "@angular/core";
import { ArraySlicePipe } from "./array-slice.pipe";
import { TimeCreationPipe } from "./creationTime.pipe";
import { ThousandSuffixPipe } from "./thousand-suffix.pipe";

@NgModule({
    declarations: [
        ArraySlicePipe,
        TimeCreationPipe,
        ThousandSuffixPipe
    ],
    exports: [
        ArraySlicePipe,
        TimeCreationPipe,
        ThousandSuffixPipe
    ]
})

export class PipesModule {
    
}