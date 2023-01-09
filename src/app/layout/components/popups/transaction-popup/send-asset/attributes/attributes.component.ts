import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { AssetTransation, PaymentInfo } from "@app/core/models/interfaces/asset-info.model";

@Component({
    selector: 'attributes',
    templateUrl: './attributes.component.html',
    styleUrls: ['./attributes.component.scss', '../send-asset.component.scss']
})

export class AttributesComponent implements AfterViewInit {
    capitalize(string: string | undefined) {
        if(!string) return;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    @Input() info?: PaymentInfo;
    @ViewChild('wrapper', {static: true}) wrapper!: ElementRef;

    onResize() {
        const width = this.wrapper.nativeElement.getBoundingClientRect().width - 20;
        const img = this.wrapper.nativeElement.getElementsByClassName('item')[0];
        img.style.fontSize = `${width}px`;
    }

    ngAfterViewInit(): void {
        this.onResize();
    }

}