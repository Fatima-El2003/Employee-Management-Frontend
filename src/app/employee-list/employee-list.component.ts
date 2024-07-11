import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.checkLoginStatus();
  }
  private checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('token') ; //we check if there is any token in the localstorage if yes the page is rendred else that means the user is not logged in so he will be redirected to the login page

    if (!isLoggedIn) {
      this.router.navigate(['/sign-in']); 
    }
  }
  loadEmployees(): void {
    this.employeeService.getEmployee().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  getEmployeeImageUrl(imageUrl: string): string {
    const fullImageUrl = `${environment.apiBaseUrl}/uploads/${imageUrl}`;
    console.log('Generated image URL:', fullImageUrl);
    return fullImageUrl;
  }
  
  editEmployee(employee: Employee): void {
    this.router.navigate(['/employee-form'], { state: { employee } });
  }

  deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        console.log('Employee deleted successfully');
        this.loadEmployees(); // Reload the list after deletion
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
}
