import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarService } from '@app/core/services/crypto/avatar.service';
import { ItemsService } from '@app/core/services/crypto/items.service';
import { LegaciesService } from '@app/core/services/crypto/legacies.service';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  host: {
    class: 'h-full'
  }
})

export class AvatarComponent implements OnInit, OnDestroy {

  // Maintane all subscriptions active
  private _subscriptions: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute,
              private itemsService: ItemsService,
              private avatarService: AvatarService,
              private legaciesService: LegaciesService,
              private router: Router) { }


  legacyRecords!: any[];
  currentAvatar!: any;
  currentData!: any;


  ngOnInit(): void {
    // Subscribe to route params
    this.handleQuery();

    // Subscribe to Legacies
    this.handleLegacies();
  }



  handleQuery() {
    return this.route.queryParams.subscribe(query => {
      if (!query['id']) {
        this.router.navigate(['dashboard/profile']);
      };

      const id = query['id'];

      const avatar = this.avatarService.getAvatarById(id);

      if (!avatar) {
        this.router.navigate(['dashboard/items']);
      };

      this.currentAvatar = avatar;
    })
  }

  // Fetch legacies
  handleLegacies() {
    return this.legaciesService.fetchLegacies().subscribe(legacies => {
      this.legacyRecords = legacies;
    })
  }

  // Show poput with decoded data
  onClickData(data: any) {
    const decodedData = this.itemsService.b64decodeWithoutParse(data);
    this.currentData = decodedData;
  }

  onClickBack() {
    this.router.navigate(['dashboard/profile']);
  }

  ngOnDestroy(): void {
    this._subscriptions.next(null);
    this._subscriptions.complete();
  }

}
