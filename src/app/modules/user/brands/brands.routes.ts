import { Routes } from "@angular/router";

export const BRAND_ROUTES: Routes = [
    {
        path: 'brands',
        loadComponent: () =>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent),
        title: 'Brands'
    }
]