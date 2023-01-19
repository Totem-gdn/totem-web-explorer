import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";


@Component({
  selector: 'totem-widget-card',
  templateUrl: './totem-widget-card.component.html',
  styleUrls: ['./totem-widget-card.component.scss'],
})

export class TotemWidgetCardComponent implements OnInit, OnDestroy {

  @Input() asset!: AssetInfo;
  @Input() game!: GameDetail;

  constructor
    (
    ) {

  }

  ngOnInit(): void {

  }

  // utils


  ngOnDestroy(): void {

  }

}
