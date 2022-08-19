import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ItemsService } from "@app/core/items.service";
import { BehaviorSubject, of, switchMap } from "rxjs";


@Component({
    selector: 'search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss']
})

export class SearchFieldComponent implements OnInit {

    constructor(private router: Router,
                private itemsService: ItemsService) {

    }
    @Input() itemType: string = '';
    @ViewChild('searchInput') searchInput!: ElementRef;
    
    items: any[] = [];
    itemsArray = new BehaviorSubject<any[] | null>(null);

    menuActive: boolean = false;
    searchActive = false;
    searchInfo = new FormControl('');


    ngOnInit(): void {
        // setInterval(() => {
        //     const items = this.itemsArray.getValue();
        //     console.log(items)
        // },1000)
        this.items = this.itemsService.items;
        this.initFormListener();
      }
    
      initFormListener() {
        this.searchInfo.valueChanges.pipe(
          switchMap((id: string | null) => {
            return of(id);
          })
        )
        .subscribe((text: string | null) => {
          console.log(text);
          if (text?.length) {
            this.getItems(text);
          }
        });
      }

      getItems(params: string) {
          let itemsArray = this.items.filter((item: any) => item.name.toLowerCase().includes(params));
          this.processItems(itemsArray && itemsArray.length ? itemsArray.slice(0, 4) : null);
      }
    
      processItems(items: any[] | null) {
        this.itemsArray.next(items);
      }

    onClickViewAll() {
        if(this.itemType === 'item') {
            this.router.navigate(['/items']);
        } else if(this.itemType === 'game') {
            this.router.navigate(['/games']);
        } else if(this.itemType === 'avatar') {
            this.router.navigate(['/avatars']);
        }
    }

    onFocus() {
        this.searchActive = true;
        console.log('search active')
    }

    onBlur() {
        this.searchActive = false;
    }

    onClickMenu() {
        this.menuActive = !this.menuActive;
    }
}