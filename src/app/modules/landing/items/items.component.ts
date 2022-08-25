import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, } from "@angular/core";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
    // host: {
    //     class: 'flex flex-auto w-full h-full'
    //   }
})

export class ItemsComponent implements OnInit, AfterViewInit {

    @ViewChild('dropupMenu') dropupMenu!: ElementRef;

    isMenuOpened = false;

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        if(this.isMenuOpened === true) {
            const dropupMenu = this.dropupMenu.nativeElement;
            // dropupMenu.style.transform = `translateY(-${dropupMenu.offsetHeight}px)`
        }
    }

    

    // onToggleMenu(isOpened: any) {
    //     this.isMenuOpened = isOpened;
    // }
  
    items = [1,2,3,4,5,6,7];
  
   
    
    
}