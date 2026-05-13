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
  imports: [CreateEmployeeComponent,EmployeesListComponent,RouterOutlet,RouterLink],
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.css'
})
export class HrComponent implements OnInit {
  constructor(private authService:AuthService,private employeeService:EmployeeService){}
  email:string='';
  role:string='';

  chart:any='';
  barChart:any='';
  employeeList: EmployeeResponse[] =[];
  employeesLength:number=0;
  
  ngOnInit(): void {
    this.email = this.authService.getEmail();
    this.role = this.authService.getRole();

    this.loadEmployees();
  }


loadEmployees(){
  this.employeeService.getAllEmployees().subscribe({
    next:(data)=>{
      this.employeeList=data;
      this.employeesLength=this.employeeList.length;

 this.createChart();
 this.createBarChart();
    },
    error:(error)=>{
      console.log("Error fetching employees",error);
    }
  })
}

  createChart(){
    console.log("Pie chart")
    const designationMap:any = {};

    this.employeeList.forEach(emp=>{
      const designation = emp.designation;
      if(designationMap[designation]){
        designationMap[designation]++;
      }
      else{
        designationMap[designation]=1;
      }
      
    })

    const labels = Object.keys(designationMap);
      const values = Object.values(designationMap);

  this.chart = new Chart("myChart", {

    type: 'pie',

    data: {

      labels: labels,

      datasets: [{

        label: 'Employees Count',

       

        data: values,

        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],

        hoverOffset: 4

      }]
    }

  });

}

   createBarChart(){
    console.log("Bar chart creating....");
   const departmentMap:any = {};


    this.employeeList.forEach(emp=>{

      if(departmentMap[emp.departmentName]){
        departmentMap[emp.departmentName].count++;
        departmentMap[emp.departmentName].totalSalary+=emp.salary

      }
      else{
        departmentMap[emp.departmentName]={
          count : 1,
          totalSalary : emp.salary
        }
      }

    })

   const labels:string[] = [];
   const averageSalaries:number[]=[];

  Object.keys(departmentMap).forEach(dept=>{

    labels.push(dept);
averageSalaries.push(
  departmentMap[dept].totalSalary / departmentMap[dept].count
);
    


  })

  

    this.barChart = new Chart("myBarChart",{
      type:'bar',

      data: {

      labels: labels,

      datasets: [{

        label: 'Average Salaries By Department',

        data: averageSalaries,

        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
      
      }]
    }
      

    })
   }
  
 
  

}


