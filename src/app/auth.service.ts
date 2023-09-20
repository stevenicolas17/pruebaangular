// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://159.65.96.86:8080/services/auth/signin'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}`, body);
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); 
    return !!token;
  }
  isValidToken(token: string): boolean {
    try {
      const decodedToken: any = jwt_decode(token); 
      if (decodedToken && decodedToken.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000); 
        return decodedToken.exp > currentTimestamp;
      }
      return false; 
    } catch (error) {
      return false; 
    }
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public logOut(): void {
    window.sessionStorage.clear();
  }
}
