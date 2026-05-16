import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router =inject(Router);
  if((req.url.includes('/login')) || (req.url.includes('/register') || (req.url.includes('/reset-password')))){
    return next(req);
  }
let authReq=req;
    if(token!=null){
       authReq = req.clone({
    setHeaders:{
      Authorization : `Bearer ${token}`
    }
  });

 
    }
 
  return next(authReq).pipe(
    catchError((error)=>{
      if(error instanceof HttpErrorResponse && error.status===401){
        localStorage.clear();
        
        router.navigate(['/login']);
      }
      return throwError(()=>error);
    })
  );

  
  
};
