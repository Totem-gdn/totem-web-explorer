import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss']
})
export class ItemFilterComponent {

  games = [{name: 'Mr.Krabs kills', subName: 'horror'}, {name: 'GTA 6', subName: 'arcade'}, {name: 'Mr.Krabs kills', subName: 'horror'}, {name: 'GTA 6', subName: 'arcade'},{name: 'Mr.Krabs kills', subName: 'horror'}, {name: 'GTA 6', subName: 'arcade'},{name: 'Mr.Krabs kills', subName: 'horror'}, {name: 'GTA 6', subName: 'arcade'},]
  elements = [{name: 'Fire'},{name: 'Earth'},{name: 'Air'},{name: 'Water'}]
  colors = [ {name: 'Red'},{name: 'Blue'},{name: 'Yellow'},{name: 'Green'},{name: 'Orange'}]
  itemTypes = [{name: 'Armour', subName: 'Slot'},{name: 'Arms', subName: 'Slot'},{name: 'Body', subName: 'Head'},{name: 'Armour', subName: 'Slot'}]
  materials = [{name: 'Bone'}, {name: 'Stone'}, {name: 'Wood'}, {name: 'Metall'}]
}
