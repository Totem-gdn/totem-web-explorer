import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'totem-promo-game',
  templateUrl: './totem-promo-game.component.html',
  styleUrls: ['./totem-promo-game.component.scss']
})
export class TotemPromoGameComponent implements OnInit {
  @Input() game!: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
