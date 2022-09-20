import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'totem-game-submission-nav',
  templateUrl: './game-submission-nav.component.html',
  styleUrls: ['./game-submission-nav.component.scss'],
  host: {
    class: 'flex'
  }
})
export class GameSubmissionNavComponent implements OnInit {

  @Input() activeTab: string = 'basic-information';
  @Output() tabSelected: EventEmitter<string> = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToTab(tab: string) {
    this.tabSelected.next(tab);
  }

}
