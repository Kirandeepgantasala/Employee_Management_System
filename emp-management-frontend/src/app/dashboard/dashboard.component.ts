import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';
import { EmployeeResponse } from '../model/EmployeeResponse';
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private empService:EmployeeService){
  }
  ngOnInit(): void {
  //  this.getEmployeeDetails();
  }
empResponse:EmployeeResponse={
  employeeId:0,
  employeeName: '',
  email: '',
  salary: 0,
designation:'',
  departmentId: 0,
  departmentName: ''
};
//   getEmployeeDetails(){
//  this.empService.getEmployee().subscribe({
//   next:(data)=>{
//     console.log(data);
//     this.empResponse=data;
//   }
//   ,
//   error:(error)=>{
//     console.log("Error occured while fetching employee",error);
//   }
//   });

  
  }
  


