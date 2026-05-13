import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'emp-management-frontend';
  constructor(private authService:AuthService){}
    role:string | null = null;
    message:string='';
   
  ngOnInit() {
    this.role = this.authService.getRole();

  }

  isAdmin():boolean{
   return  this.role === "ADMIN";
  }
isHr():boolean{
return  this.role === "HR";
}

  isEmployee():boolean{
    return this.role === "EMPLOYEE";
  }

  logout(){
    this.authService.logout();
    this.message="Logged Out Successfully";
    setTimeout(() => {
      this.message='';
    }, 2000);
  }


}


 

