import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(isFormData: boolean = false): HttpHeaders {
    const token = localStorage.getItem('token');
    if (isFormData) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }
  }

  public getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/admin/employee/all`, { headers: this.getHeaders() });
  }

  public addEmployee(employeeData: FormData): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/admin/employee/addEmployee`, employeeData, { headers: this.getHeaders(true) });
  }

  public updateEmployee(employeeData: FormData): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/admin/employee/updateEmployee`, employeeData, { headers: this.getHeaders(true) });
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/admin/employee/deleteEmployee/${employeeId}`, { headers: this.getHeaders() });
  }
}
