import { Route } from "@angular/router";
import { ProfileComponent } from "./profile.component";

export const ProfileRoutes: Route[] = [
    {
        path: '',
        component: ProfileComponent,
        children: [
          {path: '', redirectTo: 'my-assets', pathMatch : 'prefix'},
          {path: 'my-assets', loadChildren: () => import('@app/content/my-assets/my-assets.module').then(m => m.MyAssetsModule)},
          {path: 'messages', loadChildren: () => import('@app/modules/profile/dashboard/messages/messages.module').then(m => m.MessagesModule)},
      ]
    }
]
