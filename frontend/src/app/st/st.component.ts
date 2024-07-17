import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-st',
  templateUrl: './st.component.html',
  styleUrl: './st.component.css'
})
export class StComponent {
  message: any;
  signupForm: FormGroup;


  constructor(private formbuilder: FormBuilder, private apiService: ApiService, private http: HttpClient, private router: Router) {
    this.signupForm = formbuilder.group({
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      CGPA: ['', [Validators.required]]
    });
  }
                

  stfun() {
    if (this.signupForm.valid) {
      this.apiService.stdatafun(this.signupForm.value).pipe(
        catchError(error => {
          this.message = error.error.message; // Update the message with error response
          return throwError(error); // Return the error
        })
      ).subscribe(response => {
        this.signupForm.reset();
        this.message = "student successfully added";
        // console.log(response);
        setTimeout(() => {
          this.router.navigate(['/stlist']);
        }, 1000);
       
      });
    }
  }
}
