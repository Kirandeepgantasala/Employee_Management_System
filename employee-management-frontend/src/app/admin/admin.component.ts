import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserResponse } from '../model/UserResponse';
import { RouterLink, RouterOutlet } from '@angular/router';
import {Chart} from 'chart.js/auto';
import { EmployeeResponse } from '../model/EmployeeResponse';
import { EmployeeService } from '../employee.service';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,RouterOutlet,FontAwesomeModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(private authService:AuthService){}
  email:string='';
  role:string='';
  faUserShield=faUserShield;
  ngOnInit(): void {
 this.email =  this.authService.getEmail();
 this.role=this.authService.getRole();
 
  }

 

}
