import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form!: FormGroup;
  constructor(private authService: AuthService) { }


  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl({ value: '', disabled: false, }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false, }, [Validators.required])
    });
  }

  login() {
    let cridentials = this.form.value;
    this.authService.login(cridentials).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
