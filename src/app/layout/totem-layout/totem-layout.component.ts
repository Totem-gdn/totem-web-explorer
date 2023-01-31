import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { filter, delay, Subscription } from 'rxjs';

@Component({
  selector: 'totem-layout',
  templateUrl: './totem-layout.component.html',
  styleUrls: ['./totem-layout.component.scss'],
  host: {
    class: 'max-w-full w-full flex-auto relative flex h-full'
  }

})
export class TotemLayoutComponent implements OnInit, OnDestroy {

  constructor(private router: Router) { }

  @ViewChild('layout') layout?: ElementRef;
  sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .pipe(delay(1))
      .subscribe((e) => {
        if (e.position) {
          // this.viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          // this.viewportScroller.scrollToAnchor(e.anchor);
        } else {
          if(!this.layout) return;
          const layout = this.layout.nativeElement as HTMLElement;
          layout.scroll({behavior: 'smooth', top: 0, left: 0})
          const url = e.routerEvent.url;

        }
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
