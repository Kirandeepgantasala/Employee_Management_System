import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'emp-management-frontend';
  faUser = faUser;
  constructor(private authService:AuthService){
    this.user = this.authService.currentUser;
  }
    role:string | null = null;
    message:string='';

    isHr:boolean=false;
    isAdmin:boolean=false;
    isEmployee:boolean=false;
   public user!: Observable<any>;

  ngOnInit() {
    this.role = this.authService.getRole();
    console.log(this.role);
this.isAdmin = this.role === "ADMIN";
this.isHr =  this.role === "HR";
this.isEmployee =  this.role === "EMPLOYEE";
  }

  logout(){
    this.authService.logout();
    this.message="Logged Out Successfully";
    setTimeout(() => {
      this.message='';
      this.role='';
    }, 2000);
  }


}


 

