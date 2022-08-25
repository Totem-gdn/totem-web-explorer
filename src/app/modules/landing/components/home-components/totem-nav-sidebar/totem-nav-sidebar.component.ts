import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SidenavStateService } from '@app/shared/services/sidenav-state.service';

@Component({
  selector: 'totem-nav-sidebar',
  templateUrl: './totem-nav-sidebar.component.html',
  styleUrls: ['./totem-nav-sidebar.component.scss']
})
export class TotemNavSidebarComponent implements OnInit {
  sidebarIsOpen: boolean = false;
  userData: any;

  constructor(private sidenavStateService: SidenavStateService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('openlogin_store')!);
    console.log(this.userData);

    this.sidenavStateService.sidenavStatus.subscribe((val: boolean) => {
      this.sidebarIsOpen = val;
    })
  }

  change() {
    this.sidenavStateService.updateLoadingStatus(false);
  }

  close() {
    console.log('CALLED');

    this.sidenavStateService.updateLoadingStatus(false);
  }

}
