import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.currentUserSubject.next({ token });
    }
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>('http://localhost:3000/api/auth/login', credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.currentUserSubject.next(response);
        })
      );
  }

  register(user: { email: string; password: string }): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>('http://localhost:3000/api/users', user)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.currentUserSubject.next(response);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}