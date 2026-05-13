import { Component, OnInit } from '@angular/core';
import { PasswordResetRequest } from '../model/PasswordResetRequest';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-passwordreset',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './passwordreset.component.html',
  styleUrl: './passwordreset.component.css'
})
export class PasswordresetComponent implements OnInit {
  passwordResetRequest:PasswordResetRequest={token:'',newPassword:''};
  confirmPassword:string='';
  message:string='';
  errorMessage:string='';
  constructor(private route:ActivatedRoute,private authService:AuthService){}
  ngOnInit() {
  this.passwordResetRequest.token=this.route.snapshot.params['token'];
  console.log(this.route.snapshot.paramMap.get('token'));
  }

  resetPassword(){
    console.log(this.confirmPassword);
this.authService.resetPassword(this.passwordResetRequest.token,this.passwordResetRequest)
.subscribe({
  next:(data)=>{
    console.log(this.passwordResetRequest);
    this.message=data;
    console.log(data);

    setTimeout(()=>{
      this.message='';
    },3000)

  },

  error:(error)=>{
    this.errorMessage=error;
    console.log(error);
     setTimeout(()=>{
      this.errorMessage='';
    },3000)
  }

});
  }


}
