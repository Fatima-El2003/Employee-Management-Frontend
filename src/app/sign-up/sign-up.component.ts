import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.http.post(
        'http://localhost:8080/admin/employee/register',
        this.signUpForm.value
      ).subscribe(
        response => {
          console.log(response);
          // Handle successful response
          this.router.navigate(['/sign-in']); // Navigate to a success page
        },
        error => {
          console.error('Sign-up error:', error);
          alert(error.message); // Display error messa
        }
      );
    }
  }
}
