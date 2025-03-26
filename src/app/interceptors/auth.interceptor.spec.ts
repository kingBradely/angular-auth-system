import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken', 'logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add auth header when token exists', () => {
    const token = 'test-token';
    authService.getAuthToken.and.returnValue(token);

    httpClient.get('/api/test').subscribe();

    const httpRequest = httpMock.expectOne('/api/test');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should not add auth header when token does not exist', () => {
    authService.getAuthToken.and.returnValue(null);

    httpClient.get('/api/test').subscribe();

    const httpRequest = httpMock.expectOne('/api/test');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });

  it('should handle 401 error by logging out and redirecting to login', () => {
    authService.getAuthToken.and.returnValue('test-token');

    httpClient.get('/api/test').subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(401);
        expect(authService.logout).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      }
    });

    const httpRequest = httpMock.expectOne('/api/test');
    httpRequest.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should pass through non-401 errors', () => {
    authService.getAuthToken.and.returnValue('test-token');

    httpClient.get('/api/test').subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(authService.logout).not.toHaveBeenCalled();
        expect(router.navigate).not.toHaveBeenCalled();
      }
    });

    const httpRequest = httpMock.expectOne('/api/test');
    httpRequest.flush('Server Error', { status: 500, statusText: 'Server Error' });
  });
});