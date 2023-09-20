import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
  
    if (token) {
      if (this.authService.isValidToken(token)) {
        return true; 
      } else {
        this.router.navigate(['/login']);
        return false; 
      }
    } else {
     
      this.router.navigate(['/login']);
      return false; 
    }
  }
  
  
}

