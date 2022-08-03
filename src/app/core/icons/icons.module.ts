import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule()
export class IconsModule
{
    /**
     * Constructor
     */
    constructor(
        private _domSanitizer: DomSanitizer,
        private _matIconRegistry: MatIconRegistry
    )
    {
        // Register icon sets
        this._matIconRegistry.addSvgIconSet(this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/main.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('line', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/line.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('solid', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/solid.svg'));


    }
}
