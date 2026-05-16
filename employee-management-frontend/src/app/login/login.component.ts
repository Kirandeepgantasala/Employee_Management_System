import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../model/loginRequest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest:LoginRequest = {email:'',password:''};

 
   message:string='';
  errorMessage:string='';
  spinner:boolean=false;
constructor(private authService:AuthService,private router:Router){

}
  

  login() {
  

}
onSubmit(loginForm:any){
  if(loginForm.invalid){
    return;
  }
  this.spinner=true;
this.authService.login(this.loginRequest).subscribe({
  next: (data)=>{
console.log("Login Success",data);
this.message="Logged in Successfully";
setTimeout(()=>{
  this.message='';
},2000);
setTimeout(()=>{
  this.authService.updateUserStatus()
  if(data.role==="EMPLOYEE")
{
  this.router.navigate(['profile']);
}
else if(data.role==="HR"){
  this.router.navigate(['employees']);
}
else{
this.router.navigate(['admin']);
}
},1000);



  },
  error:(error)=>{
    console.log('Login Failed',error);
    this.errorMessage=error.error.error;
    console.log(this.errorMessage+" erormsg");
    this.spinner=false
    setTimeout(()=>{
      this.errorMessage='';
    },3000);
  }
}
);
}
}



