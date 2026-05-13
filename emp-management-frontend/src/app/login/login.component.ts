import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../model/loginRequest';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private authService:AuthService,private router:Router){}
  loginRequest:LoginRequest = {email:'',password:''};

 

   message:string='';
  errorMessage:string='';

  login() {
  

}
onSubmit(loginForm:any){
this.authService.login(this.loginRequest).subscribe({
  next: (data)=>{
console.log("Login Success",data);
this.message="Logged in Successfully";
setTimeout(()=>{
  this.message='';
},3000);
setTimeout(()=>{
  if(data.role==="EMPLOYEE")
{
  this.router.navigate(['profile']);
}
else if(data.role==="HR"){
  this.router.navigate(['hr']);
}
else{
this.router.navigate(['admin']);
}
},2000);



  },
  error:(error)=>{
    console.log('Login Failed',error);
    this.errorMessage=error.error.error;
    console.log(this.errorMessage+" erormsg");
    setTimeout(()=>{
      this.errorMessage='';
    },3000);
  }
}
);
}
}



