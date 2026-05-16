import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeResponse } from './model/EmployeeResponse';
import { CreateEmployeeRequest } from './model/CreateEmployeeRequest';
import { Observable } from 'rxjs';
import { UpdateEmployeeRequest } from './model/UpdateEmployeeRequest';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private apiUrl = "http://localhost:8080/employees";
  constructor(private http:HttpClient) { }

  getEmployee(employeeId: number):Observable<EmployeeResponse>{
   return this.http.get<EmployeeResponse>(`${this.apiUrl}/me`);
  }

  getAllEmployees():Observable<EmployeeResponse[]>{

    return this.http.get<EmployeeResponse[]>(`${this.apiUrl}/employees-list`);
  }

  createEmployee(createEmployeeRequest:CreateEmployeeRequest):Observable<EmployeeResponse>{
return this.http.post<EmployeeResponse>(`${this.apiUrl}/create-employee`,createEmployeeRequest);
  }

  updateEmployee(employeeId:number,updateEmployeeRequest:UpdateEmployeeRequest):Observable<EmployeeResponse>{
    return this.http.patch<EmployeeResponse>(`${this.apiUrl}/${employeeId}`,updateEmployeeRequest);
  }

  deleteEmployee(employeeId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${employeeId}`);
  }

  getEmployeeById(id:number):Observable<EmployeeResponse>{
    return this.http.get<EmployeeResponse>(`${this.apiUrl}/getEmployee/${id}`);
  }
  

getEmployeeProfile():Observable<EmployeeResponse>{
  return this.http.get<EmployeeResponse>(`${this.apiUrl}/profile`);
}





}
