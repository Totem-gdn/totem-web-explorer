import { Component } from "@angular/core";
import { Input } from "@angular/core";

@Component({
    selector: 'filter-slider',
    templateUrl: './filter-slider.component.html',
    styleUrls: ['./filter-slider.component.scss']
})

export class FilterSliderComponent {
    
    @Input() active = false;


    onClickSlider() {
        this.active = !this.active;
    }
}