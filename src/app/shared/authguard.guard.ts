import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const Authguard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const loginDetails = sessionStorage.getItem('userInfo');

  if (!loginDetails) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
