import { Component, Input, OnInit } from '@angular/core';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';

@Component({
  selector: 'totem-legacy-card',
  templateUrl: './totem-legacy-card.component.html',
  styleUrls: ['./totem-legacy-card.component.scss']
})
export class TotemLegacyCardComponent implements OnInit {

  constructor() { }
  @Input() game!: GameDetail;

  ngOnInit(): void {
  }

}
