import { NgModule } from "@angular/core";
import { ArraySlicePipe } from "./array-slice.pipe";
import { BypassUnsafeUrlPipe } from "./bypassUnsafeUrl.pipe";
import { TimeCreationPipe } from "./creationTime.pipe";
import { ThousandSuffixPipe } from "./thousand-suffix.pipe";

@NgModule({
    declarations: [
        ArraySlicePipe,
        TimeCreationPipe,
        ThousandSuffixPipe,
        BypassUnsafeUrlPipe
    ],
    exports: [
        ArraySlicePipe,
        TimeCreationPipe,
        ThousandSuffixPipe,
        BypassUnsafeUrlPipe
    ]
})

export class PipesModule {
    
}