import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access when user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    const result = TestBed.runInInjectionContext(() => authGuard());
    expect(result).toBe(true);
    expect(router.parseUrl).not.toHaveBeenCalled();
  });

  it('should redirect to login when user is not authenticated', () => {
    const mockUrlTree = jasmine.createSpyObj('UrlTree', ['toString']);
    authService.isAuthenticated.and.returnValue(false);
    router.parseUrl.and.returnValue(mockUrlTree);

    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
    expect(result).toBe(mockUrlTree);
  });
});