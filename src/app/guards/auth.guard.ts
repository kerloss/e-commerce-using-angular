import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  if (localStorage.getItem('token') != null) {    //user logedin
    return true;
  } else {
    _Router.navigate([`login`]);    //not logged in -> navigate to login page
    return false;
  }
};
