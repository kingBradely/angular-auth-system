import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty email and password', () => {
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
  });

  it('should validate email format', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTruthy();
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.errors).toBeNull();
  });

  it('should require password', () => {
    const passwordControl = component.form.get('password');
    expect(passwordControl?.errors?.['required']).toBeTruthy();
    
    passwordControl?.setValue('password123');
    expect(passwordControl?.errors).toBeNull();
  });

  it('should call auth service login method on form submission', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };
    const mockResponse = { token: 'mock-token', user: { id: '1', email: credentials.email } };
    authService.login.and.returnValue(of(mockResponse));

    component.form.setValue(credentials);
    component.login();

    expect(authService.login).toHaveBeenCalledWith(credentials);
  });

  it('should handle login error', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'wrong-password'
    };
    const mockError = new Error('Invalid credentials');
    authService.login.and.returnValue(throwError(() => mockError));

    spyOn(console, 'log');
    component.form.setValue(credentials);
    component.login();

    expect(authService.login).toHaveBeenCalledWith(credentials);
    expect(console.log).toHaveBeenCalledWith(mockError);
  });
});
