import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'totem-profile-back-button',
  templateUrl: './profile-back-button.component.html',
  styleUrls: ['./profile-back-button.component.scss']
})
export class ProfileBackButtonComponent implements OnInit {

  @Input() routeName: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['../profile']);
  }

}
