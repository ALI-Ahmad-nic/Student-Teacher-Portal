import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  message: any;
  signupForm: FormGroup;

  constructor(private formbuilder: FormBuilder, private apiService: ApiService, private router: Router,private http: HttpClient) {
    this.signupForm = formbuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loginfun() {
    if (this.signupForm.valid) {
      this.apiService.logindatafun(this.signupForm.value).pipe(
        catchError(error => {
          this.message = error.error.message;
          return throwError(error);
        })
      ).subscribe(response => {
        this.signupForm.reset();
        this.message = "login successfully";
        localStorage.setItem('token', response.token); // Store token in localStorage
        setTimeout(() => {
          this.router.navigate(['/student']);
        }, 1000);
      });
    }
  }
}
