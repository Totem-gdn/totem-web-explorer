import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { MediaQuery, queries, ScreenQueries } from "../models/enums/events.enum";

@Injectable({ providedIn: 'root' })

export class EventsService {
    private events: any = {};

    constructor(private breakpointObserver: BreakpointObserver) { }

    get screenObserver$() {

        return this.breakpointObserver
            .observe(queries)
            .pipe(
                map((state: BreakpointState) => {
                    if (state.breakpoints[ScreenQueries.xl] == true) return 'xl';
                    if (state.breakpoints[ScreenQueries.lg] == true) return 'lg';
                    if (state.breakpoints[ScreenQueries.md] == true) return 'md';
                    if (state.breakpoints[ScreenQueries.sm] == true) return 'sm';
                    if (state.breakpoints[ScreenQueries.xs] == true) return 'xs';
                    console.log(state.breakpoints)
                    return '';
                }))
    }
    

    // public on(eventName: string, callback: Function) {
    //     if (!this.events[eventName]) {
    //         this.events[eventName] = [];
    //     }
    //     this.events[eventName].push(callback);
    // }

    // public off(eventName: string, callback: Function) {
    //     if (!this.events[eventName]) {
    //         return;
    //     }
    //     this.events[eventName] = this.events[eventName].filter((eventCallback: Function) => {
    //         return callback !== eventCallback;
    //     });
    // }

    // public emit(eventName: string, data: any) {
    //     const event = this.events[eventName];
    //     if (event) {
    //         event.forEach((callback: Function) => {
    //             callback(data);
    //         });
    //     }
    // }
}