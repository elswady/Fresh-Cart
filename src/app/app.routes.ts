import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';

export const routes: Routes = [
    {path: '', loadChildren: () => import("./modules/user/user.routes").then((m)=>m.USER_ROUTES),
        canActivate: [authGuard]
    },
    {path: '', loadChildren: () => import("./modules/auth/auth.routes").then((m)=>m.AUTH_ROUTES),
        canActivate: [isLoggedInGuard]
    },
    {path: '**', loadComponent: () => import("./shared/components/not-found/not-found.component").then((c)=>c.NotFoundComponent)}
];
