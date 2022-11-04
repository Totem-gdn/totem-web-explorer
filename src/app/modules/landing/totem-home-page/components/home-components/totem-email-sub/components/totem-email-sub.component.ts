import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'totem-email-sub',
  templateUrl: './totem-email-sub.component.html',
  styleUrls: ['./totem-email-sub.component.scss']
})
export class TotemEmailSubComponent implements OnInit {
  email = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
