import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ForgotPassword } from '../model/ForgotPassword';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
forgotPassword:ForgotPassword={email:''}
message='';
errorMessage='';
  constructor(private authService:AuthService){}
  onSubmit(){
    console.log(this.forgotPassword.email)
    this.authService.forgotPassword(this.forgotPassword)
    .subscribe({
      next:(data)=>{
        this.message=data.message
        console.log(this.message)
        setTimeout(()=>{
          this.message='';
          this.forgotPassword={email:''};
        },2000);
console.log("data"+data.message)
      },
      error:(error)=>{
         this.errorMessage=error.message;
         console.log(this.errorMessage)
        setTimeout(()=>{
          this.errorMessage='';
        },2000);
console.log("error"+error.message);
      }
    });
  }

}
