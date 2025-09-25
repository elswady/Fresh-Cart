import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)

  const token = authService.getToken()

  if(token){
    req = req.clone({
      setHeaders:{ token }
    })
  }
  return next(req);
};
