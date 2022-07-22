import { Route } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { ItemsComponent } from './items.component';

export const ItemsRoutes: Route[] = [
    {
        path: '', component: ItemsComponent,
    },
    {
        path: 'item', component: ItemComponent
    }
];