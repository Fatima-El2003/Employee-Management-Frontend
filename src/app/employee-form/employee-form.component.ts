import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  selectedFile: File | null = null;
employee: any;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state && navigation.extras.state['employee']) {
      this.employee = navigation.extras.state['employee'];
    }

    this.employeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      phone: ['', Validators.required],
      imageUrl: [''],
      employeeCode: ['', Validators.required]
    });

    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  private checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('token') ; 

    if (!isLoggedIn) {
      this.router.navigate(['/sign-in']); 
    }
  }
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = new FormData();
      formData.append('employee', new Blob([JSON.stringify(this.employeeForm.value)], { type: 'application/json' }));
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      if (this.employee) {
        this.employeeService.updateEmployee(formData).subscribe(
          (response) => {
            console.log('Employee updated successfully:', response);
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error updating employee:', error);
          }
        );
      } else {
        this.employeeService.addEmployee(formData).subscribe(
          (response) => {
            console.log('Employee added successfully:', response);
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error adding employee:', error);
          }
        );
      }
    }
  }
}
