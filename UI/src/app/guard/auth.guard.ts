import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


export const authGuard: CanActivateFn = (route, state) => {
  debugger
  const authService = inject(LoginService); 
  const router = inject(Router);

  const isAuthenticated = authService.isLoggedIn();
  
  if (!isAuthenticated) {
    router.navigate(['/login']); // Redirect if not authenticated
    return false;
  }



  return true; // Allow access if authenticated
};
