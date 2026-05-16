import { Component, OnInit } from '@angular/core';
import { EmployeeResponse } from '../model/EmployeeResponse';
import { EmployeeService } from '../employee.service';
import { RouterLink } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyPipe } from '@angular/common';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faIdCardClip } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,FontAwesomeModule,CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  employeeResponse:EmployeeResponse={employeeId:0,employeeName:'',email:'',salary:0,designation:'',departmentId:0,departmentName:''};
faUser = faUser;
faEnvelope=faEnvelope;
faAddressCard = faAddressCard;
faMoneyBill = faMoneyBill;
faIdCardClip = faIdCardClip;
faUserTie = faUserTie;
faBuiding = faBuilding;
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
