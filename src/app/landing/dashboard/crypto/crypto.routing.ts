import { Route } from "@angular/router";
import { CryptoComponent } from "./crypto.component";


export const CryptoRoutes: Route[] = [
    {
        path: '', component: CryptoComponent,
        children: [
            { path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule) }
        ]
    }
]