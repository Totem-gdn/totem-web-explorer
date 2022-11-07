import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationEvent } from '@app/core/models/interfaces/page-event-interface.model';

@Component({
  selector: 'totem-pagination',
  templateUrl: './totem-pagination.component.html',
  styleUrls: ['./totem-pagination.component.scss']
})
export class TotemPaginationComponent implements OnInit {

  size: number = 20;

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
    if (this.totalValue > 20) {
      this.totalPages = Math.floor(this.totalValue / this.size);
    } else {
        this.totalPages = 0;
    }
    console.log(this.totalPages);
    this.calcPaginationValues();
  }

  pushEvent() {
    this.paginationValue = {
      size: 20,
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