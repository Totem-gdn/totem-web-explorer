import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from './layout.service';

@Component({
    selector     : 'layout',
    templateUrl  : './layout.component.html',
    styleUrls    : ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'h-full'
    }
})
export class LayoutComponent implements OnInit, OnDestroy
{
    sub!: Subscription;
    layout!: any;
    
    constructor (private router: Router,
                 private route: ActivatedRoute,
                 private layoutService: LayoutService) {}


    ngOnInit(): void {
        this.layout = this.layoutService.layout;
        this._checkLayout();

        this.sub = this.router.events.subscribe(() => {
            this._checkLayout();
        });
    }

    _checkLayout() {
        const layout = this.route.snapshot.data['layout'];
            if(layout === 'empty') {
                this.layout = 'empty';
                this.layoutService.layout = 'empty';

            }
            if(layout === 'classy') {
                this.layout = 'classy';
                this.layoutService.layout = 'classy';

            }
            if(layout === 'guest') {
                this.layout = 'guest';
                this.layoutService.layout = 'guest';

            }
    }

    ngOnDestroy() {
        console.log('destroyed');
        this.sub.unsubscribe();
    }

}
