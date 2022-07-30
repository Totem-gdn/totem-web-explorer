import { Route } from "@angular/router";
import { CryptoComponent } from "./crypto.component";


export const CryptoRoutes: Route[] = [
    {
        path: '', component: CryptoComponent,
        children: [
            { path: 'nfts', loadChildren: () => import('./nfts/nfts.module').then(m => m.NftsModule) },
            { path: 'meta', loadChildren: () => import('./nft-metadata/nft-metadata.module').then(m => m.NftMetadataModule) },
            { path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule) }
        ]
    }
]