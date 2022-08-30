import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'totem-button',
  templateUrl: './totem-button.component.html',
  styleUrls: ['./totem-button.component.scss']
})
export class TotemButtonComponent implements OnInit {
  @Input() width: string = '220px';
  @Input() height: string = '50px';
  @Input() caption: string = 'Join community';
  @Input() customId: string = 'totemJoinButton';

  @Output() clicked = new EventEmitter<MouseEvent>();

  x: number = Number(this.width) / 2;
  hovered: boolean = false;
  disableRipple: boolean = false;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 1000) {
      this.disableRipple = true;
    } else {
      this.disableRipple = false;
    }
  }

  ngOnInit(): void {
    this.disableRipple = window.innerWidth < 1000 ? true : false;
  }

  clickEvent(event: MouseEvent) {
    this.clicked.emit(event)
  }

  onMouseOver(event: MouseEvent) {
    let el = document.getElementById(this.customId);
    this.x = event.pageX - el!.getBoundingClientRect().left + 30;
  }

  onMouseLeave() {
    this.hovered = false;
  }
  onMouseEnter() {
    this.hovered = true;
  }

}
