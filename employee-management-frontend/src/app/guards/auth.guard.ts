import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);

  const router = inject(Router);
  const expectedRoles = route.data?.['roles'];
  const userRole = authService.getRole();

console.log(state.url);

  console.log('Expected Roles:', expectedRoles);
  console.log('User Role:', userRole);
  if(!authService.isLoggedin()){
    console.log('redirect login');
    return router.createUrlTree(['/login']);
  }

  if(expectedRoles && !expectedRoles.includes(userRole)){
return router.createUrlTree(['/access-denied']);
  }
  return true;
};
