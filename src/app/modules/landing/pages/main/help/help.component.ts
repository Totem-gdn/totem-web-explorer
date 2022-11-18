import { Component } from "@angular/core";
import { Gtag } from "angular-gtag";

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    host: {
        class: 'h-[600px] w-full flex flex-col justify-center text-center'
    }
})

export class HelpComponent {
  constructor(private gtag: Gtag) {
      gtag.event('page_view');
    }
}
