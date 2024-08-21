import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AuthResponse } from './auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:3000';
  private apiUrl = 'https://internship-tracker-q5u0.onrender.com';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }, {withCredentials: true})
      .pipe(
        tap((response: AuthResponse) => {
          localStorage.setItem('authToken', response.token);
        }),
        catchError(error => {
          console.error('Login failed', error);
          throw error;
        })
      );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password }, {withCredentials:true})
      .pipe(
        catchError(error => {
          console.error('Registration failed', error);
          throw error;
        })
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('authToken');
    return this.http.post(`${this.apiUrl}/logout`, {}, {withCredentials:true})
      .pipe(
        catchError(error => {
          console.error('Logout failed', error);
          throw error;
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user-data`, {
      headers: this.getAuthHeaders()
    })
    .pipe(
      catchError(error => {
        console.error('Failed to fetch user data', error);
        throw error;
      })
    );
  }
}
