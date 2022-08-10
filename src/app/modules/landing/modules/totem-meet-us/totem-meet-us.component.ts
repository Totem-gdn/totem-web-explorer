import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'totem-meet-us',
  templateUrl: './totem-meet-us.component.html',
  styleUrls: ['./totem-meet-us.component.scss']
})
export class TotemMeetUsComponent implements OnInit {
  @Input() game!: any[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.game);

  }

}
