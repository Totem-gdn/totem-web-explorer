import { Component, OnDestroy, OnInit } from "@angular/core";
import { Gtag } from "angular-gtag";

@Component({
    selector: 'totem-terms-and-policy',
    templateUrl: './terms-and-policy.component.html',
    styleUrls: ['./terms-and-policy.component.scss']
})

export class TermsAndPolicyComponent implements OnInit, OnDestroy {

  constructor(private gtag: Gtag) {
    this.gtag.event('page_view');
  }

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }
}
