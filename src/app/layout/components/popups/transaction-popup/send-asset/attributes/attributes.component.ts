import { Component, Input } from "@angular/core";
import { AssetTransation, PaymentInfo } from "@app/core/models/interfaces/asset-info.model";

@Component({
    selector: 'attributes',
    templateUrl: './attributes.component.html',
    styleUrls: ['../send-asset.component.scss']
})

export class AttributesComponent {
    capitalize(string: string | undefined) {
        if(!string) return;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    @Input() info?: PaymentInfo;

    ngOnInit() {
        console.log('info', this.info)
    }

}