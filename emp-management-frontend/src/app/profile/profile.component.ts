import { Component, OnInit } from '@angular/core';
import { EmployeeResponse } from '../model/EmployeeResponse';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  employeeResponse:EmployeeResponse={employeeId:0,employeeName:'',email:'',salary:0,designation:'',departmentId:0,departmentName:''};

  constructor(private employeeService:EmployeeService){}
  ngOnInit() {
   
    this.getEmployeeData();
  }
  

  getEmployeeData(){
    this.employeeService.getEmployeeProfile().subscribe({
      next:(data)=>{
this.employeeResponse=data;
      }
    })
  }

}
