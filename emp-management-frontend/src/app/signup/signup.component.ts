import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterRequest } from '../model/RegisterRequest';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  
constructor(private authService:AuthService,private router:Router){}

registerRequest:RegisterRequest={email:'',password:''};
  onSubmit(signUpForm:any){

    this.authService.register(this.registerRequest).subscribe({
      next:(data)=>{
        console.log("Registration Successfull");
        this.router.navigate(['login']);
      },
      error:(error)=>{
        console.log("Registration unsuccessfull");
      }
    })
  }

}
