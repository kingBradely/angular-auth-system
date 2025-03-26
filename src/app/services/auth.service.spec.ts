import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, AuthResponse } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should send login request and store token', () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const mockResponse: AuthResponse = {
        token: 'mock-token',
        user: { id: '1', email: credentials.email }
      };

      service.login(credentials).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(localStorage.getItem('auth_token')).toBe(mockResponse.token);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);
      req.flush(mockResponse);
    });
  });

  describe('register', () => {
    it('should send register request and store token', () => {
      const user = { email: 'test@example.com', password: 'password123' };
      const mockResponse: AuthResponse = {
        token: 'mock-token',
        user: { id: '1', email: user.email }
      };

      service.register(user).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(localStorage.getItem('auth_token')).toBe(mockResponse.token);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/users');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(user);
      req.flush(mockResponse);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      localStorage.setItem('auth_token', 'mock-token');
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should return false when no token exists', () => {
      localStorage.clear();
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('getAuthToken', () => {
    it('should return stored token', () => {
      const token = 'mock-token';
      localStorage.setItem('auth_token', token);
      expect(service.getAuthToken()).toBe(token);
    });

    it('should return null when no token exists', () => {
      localStorage.clear();
      expect(service.getAuthToken()).toBeNull();
    });
  });

  describe('logout', () => {
    it('should clear token and user state', () => {
      localStorage.setItem('auth_token', 'mock-token');
      service.logout();
      expect(localStorage.getItem('auth_token')).toBeNull();
      service.currentUser$.subscribe(user => {
        expect(user).toBeNull();
      });
    });
  });
});