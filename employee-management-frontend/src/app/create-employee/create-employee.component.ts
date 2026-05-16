import { Component } from '@angular/core';
import { CreateEmployeeRequest } from '../model/CreateEmployeeRequest';
import { EmployeeService } from '../employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {

  constructor(private employeeService:EmployeeService){}
  createEmployeeRequest: CreateEmployeeRequest={email:'',designation:'',salary:null,employeeName:'',departmentId:null};

  selectedDepartmentId:number|null=null;
filteredDesignations=[];
  departments=[{id:1,name:"IT"},{id:2,name:"HR"},{id:3,name:"FINANCE"}];
  message:string='';
  errorMessage:string='';
designations:any={
  'IT':[
    'Developer',
    'Tester',
    'Manager',
    "Team Lead",
  ],
  'HR':[
'HR Executive',
'Recruiter'


  ]
  ,
  'FINANCE':[
    'Accountant',
    'Finance Analyst'
  ]
}



onSubmit(createForm:any){
  console.log("Create employee on submit method ")
this.employeeService.createEmployee(this.createEmployeeRequest).subscribe({
 
  next:(data:CreateEmployeeRequest)=>{
console.log("Employee created",data);
this.message="Employee Added Successfully";
setTimeout(()=>{this.message=''},3000);
this.createEmployeeRequest = {email:'',designation:'',salary:null,employeeName:'',departmentId:null};
  },
  error:(error: any)=>{
    console.log("Error creating employee",error);
    this.errorMessage=error.error.error;
    ;
    this.createEmployeeRequest = {email:'',designation:'',salary:null,employeeName:'',departmentId:null};
setTimeout(()=>{this.errorMessage=''},3000);
  }
}
);

}

onDepartmentChange(){
if(this.selectedDepartmentId===null){
  this.filteredDesignations=[];
  this.createEmployeeRequest.departmentId=null;
}

const deptObj = this.departments.find(d=>d.id===this.selectedDepartmentId);

if(deptObj){
  this.filteredDesignations=this.designations[deptObj.name]||[];
}
this.createEmployeeRequest.departmentId=this.selectedDepartmentId;
}




}


