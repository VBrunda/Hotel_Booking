import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const childAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(LoginService); 
  const router = inject(Router);
  debugger;
  const userRole = authService.getLoggedInUser().role;

  if (userRole !== "admin") {
    router.navigate(['/unauthorized']); // Redirect if role does not match
    return false;
  }

  return true; // Allow access role matches
};
