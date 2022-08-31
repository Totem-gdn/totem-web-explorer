import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'totem-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss'],
  host: {
    class: 'flex'
  }
})
export class ProfileStatsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
