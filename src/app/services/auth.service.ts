import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  loginWithGoogle(): Observable<any> {
    // Redirect to the backend Google login endpoint
    window.location.href = `${this.apiUrl}/auth/google`;
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }
}
