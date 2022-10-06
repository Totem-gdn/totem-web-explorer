import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { Tag } from "@app/core/models/tag-interface.model";


@Component({
    selector: 'form-dropdown',
    templateUrl: './form-dropdown.component.html',
    styleUrls: ['./form-dropdown.component.scss'],
    host: {
        class: 'max-w-[300px]'
    }
})

export class FormDropdownComponent implements AfterViewInit {

    @Input() items: any = [{ name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' }, { name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' },]
    menuActive = false;

    @ViewChild('menuItems') menuItems!: ElementRef;
    @ViewChild('dropdown') dropdown!: ElementRef;

    @Input() title = 'menu';
    @Input() inputType = 'checkbox';

    @Output() selectedTag = new EventEmitter<any>();
    @Output() removeTag = new EventEmitter<any>();
    @Output() touched = new EventEmitter<boolean>();
    @Output() valuesReference = new EventEmitter<any[]>();

    @Input() set setTitle(title: any) {
        if (!title) return;
        this.title = title;
    }
    @Input() set setItems(values: any) {
        if (!values) return;
        const items = this.menuItems.nativeElement.getElementsByTagName('input');
        for (let item of items) {
            for (let value of values) {
                if (item.value == value) {
                    item.checked = true;
                    this.onChangeInput(item);
                }
            }
        }
    }


    onChangeInput(el: any) {
        const reference = el;
        const value = el.value;
        const checked = el.checked;
        const tag: any = {
            reference, value, checked
        }
        if (checked == true) this.selectedTag.emit(tag);
        if (checked == false) this.removeTag.emit(tag);

        if (this.inputType === 'radio') {
            this.title = value;
        }
    }

    ngAfterViewInit() {
        console.log(this.title);
        const itemHeight = this.menuItems.nativeElement.children[0].offsetHeight;
        this.menuItems.nativeElement.style.maxHeight = `${itemHeight * 4}px`;

        const items = this.menuItems.nativeElement.getElementsByTagName('input');
        for (let item of items) {
            if (item.value == this.title) {
                item.checked = true;
            }
        }
    }

    onToggleMenu() {
        if (this.menuActive) this.touched.emit();
        this.menuActive = !this.menuActive;
    }

    onClick(isClickedInside: any) {
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
            this.touched.emit();
        }
    }
}