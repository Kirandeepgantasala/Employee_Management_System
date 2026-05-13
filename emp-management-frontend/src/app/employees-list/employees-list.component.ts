import { Component, OnInit } from '@angular/core';
import { EmployeeResponse } from '../model/EmployeeResponse';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit{

  constructor(private employeeService:EmployeeService,private router:Router){}
 
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  employeeResponse!:Observable<EmployeeResponse[]>;

   ngOnInit(): void {
    this.employeeResponse=this.getAllEmployees();
   
  }

  editEmployeeDetails(employeeId:number){
    this.router.navigate(["employees/updateEmployee",employeeId]);
  }

  getAllEmployees():Observable<EmployeeResponse[]>{
 return this.employeeService.getAllEmployees();
  }

  loadEmployees(){
   this.employeeResponse = this.getAllEmployees();
  }

 
   deleteEmployee(employeeId:number){
    this.employeeService.deleteEmployee(employeeId).subscribe({
next:()=>{
  this.loadEmployees();
  console.log("Employee Deleted");
  
},
error:(error)=>{
  console.log(error);
    }
    });
    }
  

    

}
function next(value: void): void {
  throw new Error('Function not implemented.');
}

