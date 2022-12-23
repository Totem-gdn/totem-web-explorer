import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationEvent } from '@app/core/models/interfaces/page-event-interface.model';

@Component({
  selector: 'totem-pagination',
  templateUrl: './totem-pagination.component.html',
  styleUrls: ['./totem-pagination.component.scss']
})
export class TotemPaginationComponent implements OnInit {

  @Input() size: number = 20;

  fromValue: number = 0;
  toValue: number = 0;

  currentPage: number = 0;
  previusPage: number = 0;
  totalPages: number = 0;

  paginationValue!: PaginationEvent;

  @Input() totalValue: number = 0;
  @Output() paginationEvent = new EventEmitter<PaginationEvent>();

  constructor() { }

  ngOnInit(): void {
    if (this.totalValue > this.size) {
      this.totalPages = Math.floor(this.totalValue / this.size);
      if (this.totalValue % this.size == 0) {
        this.totalPages -= 1;
      }
    } else {
        this.totalPages = 0;
    }
    if (this.totalValue == 0) return;
    this.calcPaginationValues();
  }

  pushEvent() {
    this.paginationValue = {
      size: this.size,
      currentPage: this.currentPage,
      previousPage: this.previusPage
    }
    this.paginationEvent.next(this.paginationValue);
  }

  prevPage() {
    if (this.currentPage !== 0) {
      this.previusPage = this.currentPage;
      this.currentPage -= 1;
      this.calcPaginationValues();
      this.pushEvent();
    }
  }

  nextPage() {
    if (this.currentPage !== this.totalPages) {
      this.previusPage = this.currentPage;
      this.currentPage += 1;
      this.calcPaginationValues();
      this.pushEvent();
    }
  }

  calcPaginationValues() {
    if (this.currentPage !== this.totalPages) {
      this.fromValue = this.currentPage * this.size + 1;
      this.toValue = (this.currentPage * this.size) + this.size;
    } else {
      this.fromValue = this.currentPage * this.size + 1;
      this.toValue = this.totalValue;
    }
  }



}
