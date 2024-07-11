import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:8080/admin/employee/login', this.loginForm.value)
        .subscribe(
          (response: any) => {
            console.log('Server response:', response);
            if (response) {

              localStorage.setItem('token', response.body.token);  
              this.router.navigate(['/']); // Navigate to the home page
            } else {
              console.error('Token is not present in the response');
              alert('Login failed: Token not received');
            }
          },
          error => {
            console.error('Login error:', error);
            alert('Login failed: ' + error.error);
          }
        );
    }
  }
  

}
