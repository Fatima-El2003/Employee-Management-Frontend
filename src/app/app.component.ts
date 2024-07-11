import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  
  // Constructor injection of the employee service class (that we have made injectable)
  constructor(private employeeService: EmployeeService, private router: Router) {}

  // This method will be executed when the component is initialized
  ngOnInit(): void {
    this.getEmployees();
  }

  // Here we call the getEmployee method of the employee service class
  public getEmployees(): void {
    this.employeeService.getEmployee().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ); // We subscribe so we can get notified whenever we get the result of getEmployee
  }
  editEmployee(employee: Employee): void {
    this.router.navigate(['/employee-form'], { state: { employee } });//we have a state in the navigation this state can be accessible
  }
  deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        console.log('Employee deleted successfully');
        this.getEmployees(); // Reload the list after deletion
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
}
