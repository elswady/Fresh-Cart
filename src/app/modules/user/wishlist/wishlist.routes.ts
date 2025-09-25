import { Routes } from "@angular/router";

export const WISHLIST_ROUTES: Routes = [
    {
        path: 'wish-list',
        loadComponent: () =>import('./pages/wish-list/wish-list.component').then((c)=>c.WishListComponent),
        title: 'Wish List'
    }
]