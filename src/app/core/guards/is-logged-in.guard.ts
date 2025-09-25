import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)
  if(authService.isLoggedIn()){
    router.navigate(['/home'])
    return false
  }else{
    return true
  }
};
