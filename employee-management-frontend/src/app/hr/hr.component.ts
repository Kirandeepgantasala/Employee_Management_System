import { Component, OnInit } from '@angular/core';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';
import { EmployeeResponse } from '../model/EmployeeResponse';
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.css'
})
export class HrComponent {
 

}