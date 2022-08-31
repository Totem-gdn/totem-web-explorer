import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'totem-profile-navigation',
  templateUrl: './profile-navigation.component.html',
  styleUrls: ['./profile-navigation.component.scss'],
  host: {
    class: 'flex'
  }
})
export class ProfileNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
