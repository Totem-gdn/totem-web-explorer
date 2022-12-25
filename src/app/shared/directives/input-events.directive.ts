import { Directive, HostBinding } from "@angular/core";

@Directive({
    selector: '[inputEvents]'
})

export class InputEventsDirective {

    @HostBinding('attr.tabindex') tabindex = '0';
    @HostBinding('style.outline') outline = 'none';
}