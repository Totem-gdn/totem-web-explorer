import { Component, Input, OnInit, } from '@angular/core';

@Component({
    selector: 'app-avatars',
    templateUrl: './avatars.component.html',
    styleUrls: ['./avatars.component.scss'],
    host: {
        class: 'px-[20px] lg:pt-[40px]'
    }
})
export class AvatarsComponent implements OnInit {
  @Input() avatars: any[] = [0,0,0,0,0,0,0];
  ngOnInit(): void {

  }
}
