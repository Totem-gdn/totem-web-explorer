import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";
import { timer } from "rxjs";
import { GameDropdownComponent } from "../game-dropdown/game-dropdown.component";


@Component({
  selector: 'widget-dropdown',
  templateUrl: '../game-dropdown/game-dropdown.component.html',
  styleUrls: ['../game-dropdown/game-dropdown.component.scss', './widget-dropdown.component.scss']
})

export class WidgetDropdownComponent extends GameDropdownComponent implements OnInit, OnDestroy {


  @ViewChild('menuItems') menuItems!: ElementRef;

  scriptStarted: boolean = false;
  get scriptIndex() { return this.widgetService.scriptIndex };
  set scriptIndex(index: number | undefined) { this.widgetService.scriptIndex = index }

  ngOnInit() {
    this.alwaysOpen = true;
    this.menuActive = true;
    this.dropdownGames$();
    this.restartScript();
  }

  dropdownGames$() {
    this.gamesService.dropdownGames$.subscribe(games => {
      if (games) this.restartScript();
    })
  }

  startScript() {
    timer(1000, 6000).pipe(
      untilComponentDestroyed(this),
    ).subscribe(() => {
      if (this.scriptIndex == undefined) {
        return;
      }
      if (this.scriptIndex >= this.games.length) this.scriptIndex = 0;
      this.widgetService.updateSelectedGame(this.games[this.scriptIndex]);
      this.title = this.selectedScriptItem?.general?.name;
      const menuItems = this.menuItems.nativeElement.getElementsByClassName('menu-item');
      const itemBottomPos = menuItems[this.scriptIndex].offsetTop - 14;
      if (this.scriptIndex > 3) {
        const scrollContainer = this.menuItems.nativeElement as HTMLElement;
        scrollContainer.scroll({ top: itemBottomPos, behavior: 'smooth' })
      }
      if (this.scriptIndex == 0) {
        const scrollContainer = this.menuItems.nativeElement as HTMLElement;
        scrollContainer.scroll({ top: 0, behavior: 'smooth' })
      }
      this.widgetService.updateSelectedGame(this.selectedScriptItem);
      this.scriptIndex++;
    })
  }

  restartScript() {
    if (this.scriptIndex == undefined) return;
    this.scriptIndex = 0;
    this.startScript();
  }

}
