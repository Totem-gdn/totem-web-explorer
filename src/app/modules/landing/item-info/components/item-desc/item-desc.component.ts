import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'item-desc',
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.scss']
})
export class ItemDescComponent implements OnInit {

  constructor() { }
  
  @Input() wallet: undefined | string;
  @Input() nft!: any;

  ngOnInit(): void {
    
  }

}
