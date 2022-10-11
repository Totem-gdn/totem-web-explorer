import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SubmitGame } from "@app/core/models/submit-game-interface.model";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'game-review',
    templateUrl: './game-review.component.html',
    styleUrls: ['./game-review.component.scss'],
    host: {
        class: 'lg:min-w-[420px]'
    }
})

export class GameReviewComponent implements OnInit {

    @Input() game!: SubmitGame | any;
    toggleDropdown = false;

    @ViewChild('stars') stars!: ElementRef;
    rating: boolean[] = [false, false, false, false, false];

    ngOnInit() {

    }
    onMouseEnter(e: any) {
        const container = this.stars.nativeElement as any;
        const stars = container.getElementsByClassName('star');
        for(let star of stars) {
            star.style.color = '#ffd013';
            if(star == e.target) break;
        }

        console.log(e)
    }
    onMouseLeave(e: any) {
        const container = this.stars.nativeElement as any;
        const stars = container.getElementsByClassName('star');
        for(let star of stars) {
            star.style.color = 'unset';
        }
    }

    onSaveStars(e: any) {
        this.resetStars();
        const container = this.stars.nativeElement as any;
        const selectedStar = e._elementRef.nativeElement;
        const stars = container.getElementsByClassName('star');
        let i = 0;
        for(let star of stars) {
            this.rating[i] = true;
            if(star == selectedStar) break;
            i++;
        }
    }

    resetStars() {
        for(let rate of this.rating) {
            rate = false;
        }
    }

    onToggle() {
        this.toggleDropdown = !this.toggleDropdown;
    }
}