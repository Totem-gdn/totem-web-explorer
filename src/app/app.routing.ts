import { Route } from "@angular/router";
import { AuthGuard } from "./core/auth/guards/auth.guard";
import { NoAuthGuard } from "./core/auth/guards/noAuth.guard";
import { LayoutComponent } from "./landing/layout/layout.component";
import { InitialDataResolver } from "./core/resolvers/app.resolvers";
import { GuestDataResolver } from "./core/resolvers/guest.resolvers";


export const appRoutes: Route[] = [


  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },


  // Routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'guest'
    },
    resolve: {
      GuestDataResolver
    },
    children: [
      {path: 'home', loadChildren: () => import('app/landing/home/home.module').then(m => m.HomeModule)},
    ]
  },

  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {path: 'sign-in', loadChildren: () => import('app/landing/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
    ]
  },


  // Routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'classy'
    },
    resolve: {
      InitialDataResolver
    },
    children: [
      { path: 'dashboard', loadChildren: () => import('app/landing/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },


  // Sign Out
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      { path: 'sign-out', loadChildren: () => import('app/landing/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) }
    ],
  },

  //landing page
  {
    path: 'landing',
    loadChildren: () => import('./totem-landing/totem-landing.module').then(m => m.TotemLandingModule)
  },


];

