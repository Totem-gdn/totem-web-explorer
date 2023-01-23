import { Component } from "@angular/core";
import { PAYMENT_METHOD } from "@app/core/models/enums/transaction-type.enum";
import { TransferService } from "@app/core/services/crypto/transfer.service";
import { BaseStorageService } from "@app/core/services/utils/base-storage.service";


@Component({
    selector: 'payment-method',
    templateUrl: './payment-method.component.html',
    styleUrls: ['./payment-method.component.scss', '../transaction-popup.component.scss'],
    host: {
        class: 'h-full'
    }
})

export class PaymentMethodComponent {
    get paymentType() {return PAYMENT_METHOD}

    constructor(private transferService: TransferService) {}

    // set paymentMethod(method: PAYMENT_METHOD | null) {
    //     {
    //         if (!method) return;
    //         this.localStorage.setItem('paymentMethod', method)
    //     }
    // }
    get paymentMethod() { return this.transferService.paymentMethod }

    // constructor(private localStorage: BaseStorageService) {}

    onChangeInput(e: any) {
        const paymentMethod = (e.target.value as PAYMENT_METHOD)
        this.transferService.paymentMethod = paymentMethod;
    }
}