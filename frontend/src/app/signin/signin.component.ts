import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

message: any;
  signupForm: FormGroup;


  constructor(private formbuilder: FormBuilder, private apiService: ApiService, private http: HttpClient, private router: Router) {
    this.signupForm = formbuilder.group({
      // fname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]],
      // confirmpassword: ['', [Validators.required]]
    });
  }


  postfun() {
    if (this.signupForm.valid) {
      this.apiService.postdatafun(this.signupForm.value).pipe(
        catchError(error => {
          this.message = error.error.message; // Update the message with error response
          return throwError(error); // Return the error
        })
      ).subscribe(response => {
        this.signupForm.reset();
        this.message = "registered successfully";
        console.log(response);
      });
    }
}
}