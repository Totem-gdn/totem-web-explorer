import { Component, Input } from "@angular/core";




@Component({
    selector: 'loading-spinner',
    template: `<div #ellipsis class="lds-ellipsis"><div [style.background-color]="color"></div><div [style.background-color]="color"></div><div [style.background-color]="color"></div><div  [style.background-color]="color"></div></div>`,
    styles: [`
        .lds-ellipsis {
  display: flex;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-ellipsis div {
  position: absolute;
  top: 16px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 4px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 4px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 16px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 28px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(12px, 0);
  }
}

    `]
})

export class LoadingSpinner {

  @Input() color = '#ffd013';
  // @Input() width = '80px';
  // @ViewChild('ellipsis') ellipsis!: ElementRef;

  // ngAfterViewInit() {
  //   this.ellipsis.nativeElement.style.width = this.width;
  //   this.ellipsis.nativeElement.style.height = this.width;
  // }

}
