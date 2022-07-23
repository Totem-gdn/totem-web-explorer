import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '@app/core/services/crypto/items.service';
import { LegaciesService } from '@app/core/services/crypto/legacies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'h-full'
  }
  
})
export class ItemComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private itemsService: ItemsService,
              private legaciesService: LegaciesService,
              private router: Router) { }

    
  sub!: Subscription;
    
  currentData!: any;
  currentItem!: any | null;
  legacyRecords!: any[];


  ngOnInit(): void {
    this.sub = this.handleQuery();

  }


  
  // Handle query
  handleQuery() {
    return this.route.queryParams.subscribe(query => {
      if(!query['id']) {
        this.router.navigate(['dashboard/items']);
      };

      const id = query['id'];
      const item = this.itemsService.getItemById(id);

      if(!item) {
        this.router.navigate(['dashboard/items']);
      };
      this.handleLegacies(id);

      this.currentItem = item;
    })
  }

  // Fetch legacies
  handleLegacies(id: string) {
    this.legaciesService.fetchLegacies(id).subscribe((legacies: any) => {
      this.legacyRecords = legacies;
    })
  }


  // Navigate back to items
  onClickBack() {
    this.router.navigate(['dashboard/items']);
  }


  // Decode base64 data and show in popup
  onClickData(data: any) {
    const decodedData = this.itemsService.b64decodeWithoutParse(data);
    
    this.currentData = decodedData;
  }


}
