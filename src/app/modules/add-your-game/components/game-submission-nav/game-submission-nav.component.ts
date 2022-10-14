import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormValidity } from '@app/core/models/submit-game-interface.model';
import { Subscription } from 'rxjs';
import { FormsService } from '../../services/forms.service';
import { SubmitGameService } from '../../services/submit-game.service';

@Component({
  selector: 'totem-game-submission-nav',
  templateUrl: './game-submission-nav.component.html',
  styleUrls: ['./game-submission-nav.component.scss'],
  host: {
    class: 'flex'
  }
})
export class GameSubmissionNavComponent implements OnDestroy, AfterViewInit {

  @Input() activeTab: string = 'basic-information';
  @Output() tabSelected: EventEmitter<string> = new EventEmitter();


  @ViewChild('detailsTab') detailsTab!: ElementRef;
  @ViewChild('linksTab') linksTab!: ElementRef;

  sub!: Subscription;
  constructor(private formsService: FormsService) { }

  ngAfterViewInit(): void {

    this.sub = this.formsService.tabsValidity$().subscribe((tabs: FormValidity) => {

      if(tabs.basicInfoValid) {
        this.detailsTab.nativeElement.style.pointerEvents = 'all';
        this.linksTab.nativeElement.style.pointerEvents = 'all';
      } else {
        this.detailsTab.nativeElement.style.pointerEvents = 'none';
        this.linksTab.nativeElement.style.pointerEvents = 'none';

        /* if(this.activeTab != 'basic-information') {
          this.goToTab('basic-information');
        } */
      }

      if(tabs.detailsValid) {
        this.linksTab.nativeElement.style.pointerEvents = 'all';
      } else {
        this.linksTab.nativeElement.style.pointerEvents = 'none';
        /* if(this.activeTab == 'links' && tabs.basicInfoValid) {
          this.goToTab('details');
        } else {
          this.goToTab('basic-info');
        } */
      }
    })
  }

  goToTab(tab: string) {
    this.tabSelected.next(tab);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
