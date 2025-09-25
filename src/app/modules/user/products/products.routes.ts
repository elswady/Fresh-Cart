import { Routes } from "@angular/router";

export const PRODUCT_ROUTES: Routes = [
    {
        path: 'products',
        loadComponent: () => import("./pages/products/products.component").then((c)=>c.ProductsComponent),
        title:"Products"
    },
    {
        path: 'products-details/:id/:title',
        loadComponent: () => import("./pages/products-details/products-details.component").then((c)=>c.ProductsDetailsComponent),
        title:"Products Details"
    }
]