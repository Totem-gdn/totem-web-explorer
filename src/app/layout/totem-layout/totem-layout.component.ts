import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { Animations } from '@app/core/animations/animations';
import { filter, delay, Subscription, timer } from 'rxjs';

@Component({
  selector: 'totem-layout',
  templateUrl: './totem-layout.component.html',
  styleUrls: ['./totem-layout.component.scss'],
  host: {
    class: 'max-w-full w-full flex-auto relative flex h-full'
  },
  animations: Animations.animations

})
export class TotemLayoutComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver) { }

  @ViewChild('layout') layout?: ElementRef;
  routerSub?: Subscription;
  scrollSubscription: Subscription = new Subscription();
  subs: Subscription = new Subscription();
  toggleSideselector: boolean = true;
  toggleMobileSideselector: boolean = false;
  isScrolling: boolean = false;

  ngOnInit(): void {
    this.observeTheScreen();
    this.routerSub = this.router.events
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

  observeTheScreen() {
    this.subs.add(
      this.breakpointObserver
        .observe(['(min-width: 1000px)'])
        .subscribe((state: BreakpointState) => {
            if (state.matches) {
              this.toggleSideselector = true;
            } else {
              this.toggleSideselector = false;
            }
        })
    );
  }

  onScroll(event: any) {
    this.scrollSubscription.unsubscribe();

    if (!this.isScrolling) {
      this.isScrolling = true;
    }

    this.scrollSubscription = timer(4000).subscribe(() => {
      this.isScrolling = false;
      this.scrollSubscription.unsubscribe();
    })
  }

  toggleSelector(flag: boolean) {
    this.toggleMobileSideselector = flag;
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.subs.unsubscribe();
  }
}
