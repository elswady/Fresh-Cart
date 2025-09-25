import { Routes } from "@angular/router";
import { UserLayoutComponent } from "../../layouts/user-layout/user-layout.component";
import { PRODUCT_ROUTES } from "./products/products.routes";
import { CART_ROUTES } from "./cart/cart.routes";
import { ORDER_ROUTES } from "./orders/order.routes";
import { WISHLIST_ROUTES } from "./wishlist/wishlist.routes";
import { CATEGORIES_ROUTES } from "./categories/categories.routes";
import { BRAND_ROUTES } from "./brands/brands.routes";
import { HOME_ROUTES } from "./home/home.routes";

export const USER_ROUTES: Routes = [
    {path: '', component: UserLayoutComponent,
        children: [
            ...HOME_ROUTES,
            ...PRODUCT_ROUTES,
            ...CATEGORIES_ROUTES,
            ...BRAND_ROUTES,
            ...CART_ROUTES,
            ...ORDER_ROUTES,
            ...WISHLIST_ROUTES
        ]
    }
]