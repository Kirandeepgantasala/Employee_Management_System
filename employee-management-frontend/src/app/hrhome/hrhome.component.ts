import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';
import { EmployeeResponse } from '../model/EmployeeResponse';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-hrhome',
  standalone: true,
  imports: [],
  templateUrl: './hrhome.component.html',
  styleUrl: './hrhome.component.css'
})
export class HrhomeComponent implements OnInit{

   constructor(private authService:AuthService,private employeeService:EmployeeService){}
  email:string='';
  role:string='';

  designationChart:any='';
  barChart:any='';
  departmentChart:any='';
  employeeList: EmployeeResponse[] =[];
  employeesLength:number=0;
  
  ngOnInit() {
    this.loadEmployees();
    this.email = this.authService.getEmail();
    this.role = this.authService.getRole();

    
  }


loadEmployees(){
  this.employeeService.getAllEmployees().subscribe({
    next:(data)=>{
      this.employeeList=data;
      this.employeesLength=this.employeeList.length;

 this.createChart();
 this.createChart1();
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

  this.designationChart = new Chart("myChart", {

    type: 'pie',

    data: {

      labels: labels,

      datasets: [{

        label: 'Employees Count',

       

        data: values,

        backgroundColor: [
          'rgb(93, 91, 129)',
          'rgb(127, 83, 172)',
          'rgb(255, 205, 86)',
         'rgb(160, 132, 220)',
         'rgb(196, 181, 253)'
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
          'rgb(108, 99, 255)',
  'rgb(127, 83, 172)',
  'rgb(160, 132, 220)',
  'rgb(93, 91, 129)',
  'rgb(139, 92, 246)'
        ],
      
      }]
    }
      

    })
   }
  


   createChart1(){
    console.log("Pie chart")
    const departmentMap:any = {};

    this.employeeList.forEach(emp=>{
      const departmentName = emp.departmentName;
      if(departmentMap[departmentName]){
        departmentMap[departmentName]++;
      }
      else{
        departmentMap[departmentName]=1;
      }
      
    })

    const labels = Object.keys(departmentMap);
      const values = Object.values(departmentMap);

  this.departmentChart = new Chart("myChart1", {

    type: 'pie',

    data: {

      labels: labels,

      datasets: [{

        label: 'Employees Count By Department',

       

        data: values,

        backgroundColor: [
          'rgb(93, 91, 129)',
          'rgb(127, 83, 172)',
          'rgb(255, 205, 86)',
         'rgb(160, 132, 220)',
         'rgb(196, 181, 253)'
        ],

        hoverOffset: 4

      }]
    }

  });
 
  

}

}
