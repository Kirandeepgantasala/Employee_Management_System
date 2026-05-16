import { Component, OnInit } from '@angular/core';
import { UpdateEmployeeRequest } from '../model/UpdateEmployeeRequest';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {

  employeeId!: number;
 
  updateEmployeeRequest: UpdateEmployeeRequest = {email:'',employeeName:'',salary:0,designation:''};
  constructor(private employeeService:EmployeeService,private router:Router, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.employeeId=this.route.snapshot.params['id'];
   this.employeeService.getEmployeeById(this.employeeId).subscribe({
    next:(data)=>{
      console.log(this.employeeId)
      console.log(data);
      console.log(data.email)
      this.updateEmployeeRequest=data;
      
     
    }
   });
  }


  

  onSubmit(){
    this.employeeService.updateEmployee(this.employeeId,this.updateEmployeeRequest).subscribe({
 
      next:(data)=>{
        
        console.log("Employee Updated Successfully");
        this.router.navigate(["employees/employeesList"]);
      },
      error(err) {
          console.log("Unable to update employee",err)
      }
    })
  }

}
