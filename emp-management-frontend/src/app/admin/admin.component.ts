import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserResponse } from '../model/UserResponse';
import { RouterLink, RouterOutlet } from '@angular/router';
import {Chart} from 'chart.js/auto';
import { EmployeeResponse } from '../model/EmployeeResponse';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(private authService:AuthService){}
  email:string='';
  role:string='';
  
  ngOnInit(): void {
 this.email =  this.authService.getEmail();
 this.role=this.authService.getRole();
 
  }

 

}
