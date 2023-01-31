import { NgModule } from "@angular/core";
import { ArraySlicePipe } from "./array-slice.pipe";
import { BypassUnsafeUrlPipe } from "./bypassUnsafeUrl.pipe";
import { TimeCreationPipe } from "./creationTime.pipe";
import { ThousandSuffixPipe } from "./thousand-suffix.pipe";
import { YoutubeThumbnail } from "./youtubeThumbnail.pipe";

@NgModule({
    declarations: [
        ArraySlicePipe,
        TimeCreationPipe,
        ThousandSuffixPipe,
        BypassUnsafeUrlPipe,
        YoutubeThumbnail,
    ],
    exports: [
        ArraySlicePipe,
        TimeCreationPipe,
        ThousandSuffixPipe,
        BypassUnsafeUrlPipe,
        YoutubeThumbnail,

    ]
})

export class PipesModule {
    
}