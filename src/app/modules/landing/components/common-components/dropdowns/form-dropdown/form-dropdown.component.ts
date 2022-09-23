import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Tag } from "@app/core/models/tag-interface.model";


@Component({
    selector: 'form-dropdown',
    templateUrl: './form-dropdown.component.html',
    styleUrls: ['./form-dropdown.component.scss'],
    host: {
        class: 'max-w-[300px]'
    }
})

export class FormDropdownComponent {

    @Input() items: any = [{ name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' }, { name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' },]
    menuActive = false;

    @ViewChild('menuItems') menuItems!: ElementRef;
    @ViewChild('dropdown') dropdown!: ElementRef;
    
    @Input() title = 'menu';

    @Output() selectedTag = new EventEmitter<Tag>();
    @Output() touched = new EventEmitter<boolean>();

    onChangeInput(e: any) {
        const reference = e.target;
        const value = e.target.value;
        const checked = e.target.checked;
        const tag: Tag = {
            reference, value, checked
        }

        this.selectedTag.emit(tag);
    }

    ngAfterViewInit(): void {
        const itemHeight = this.menuItems.nativeElement.children[0].offsetHeight;
        console.log(`${itemHeight * 4}`)
        this.menuItems.nativeElement.style.maxHeight = `${itemHeight * 4}px`;
    }

    onToggleMenu() {
        if(this.menuActive) this.touched.emit(true);
        this.menuActive = !this.menuActive;
    }

    onClick(isClickedInside: any) {
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
        }
    }
}