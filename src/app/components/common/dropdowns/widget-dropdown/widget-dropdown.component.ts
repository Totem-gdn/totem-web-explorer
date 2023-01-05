import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";
import { Subscription, take, takeUntil, timer } from "rxjs";
import { DropdownSkeletonComponent } from "../dropdown-skeleton/dropdown-skeleton.component";
import { GameDropdownComponent } from "../game-dropdown/game-dropdown.component";


@Component({
  selector: 'widget-dropdown',
  templateUrl: '../game-dropdown/game-dropdown.component.html',
  styleUrls: ['../game-dropdown/game-dropdown.component.scss', './widget-dropdown.component.scss']
})

export class WidgetDropdownComponent extends GameDropdownComponent implements AfterViewInit {

  @ViewChild('skeleton') skeleton!: any;

  ngAfterViewInit(): void {
    this.skeleton.widgetMode = true;
    this.startScript();
    this.widgetGame$();
    this.changeDetector.detectChanges();
  }

  startScript() {
    this.scriptSub?.unsubscribe();

    this.scriptSub = timer(1000, 6000).subscribe(() => {
      let scriptIndex = this.widgetService.scriptIndex;
      if (!this.dropdownGames.length) {
        scriptIndex = 0;
        return;
      }
      if(scriptIndex == undefined) {
        this.scriptSub?.unsubscribe();
        return;
      }
      if (scriptIndex >= this.dropdownGames.length) scriptIndex = 0;
      this.widgetService.selectedGame = this.dropdownGames[scriptIndex].data;
      // this.scriptSelectedGame = this.dropdownGames[scriptIndex];
      // Auto Scroll
      // const menuItems = this.skeletonMenuRef.menuItemsgetElementsByClassName('menu-item');
      // const itemBottomPos = menuItems[this.scriptIndex].offsetTop - 14;
      // if(this.scriptIndex > 3) {
      //   const scrollContainer = menuItems.nativeElement as HTMLElement;
      //   scrollContainer.scroll({top: itemBottomPos, behavior: 'smooth'})
      // }
      // if(this.scriptIndex == 0) {
      //   const scrollContainer = menuItems.nativeElement as HTMLElement;
      //   scrollContainer.scroll({top: 0, behavior: 'smooth'})
      // }
      // this.selectedGame = this.dropdownGames[this.scriptIndex];
      this.widgetService.scriptIndex = scriptIndex + 1;
    })
  }

  widgetGame$() {
    this.widgetService.selectedGame$
    .pipe(takeUntil(this.subs))
    .subscribe(selectedGame => {
      if(!selectedGame) {
        this.scriptSelectedGame = undefined;
        return;
      }
      this.scriptSelectedGame = this.formatGame(selectedGame);
    })
  }

}
