import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserResponse } from '../model/UserResponse';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateUserStatus } from '../model/UpdateUserStatus';
import { UpdateUserRole } from '../model/UpdateUserRole';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

    list!: Observable<UserResponse[]>; 
    oldValue:any;
    message:string='';
    errorMessage:string='';
    
   
constructor(private authService:AuthService){}
  
ngOnInit(): void {
    this.list =this.authService.getAllUsers(); 
  }

  updateAccess(user:any){
    const previousValue = user.enabled;
    user.enabled = !user.enabled;
const updateUserAccess: UpdateUserStatus={"enabled":user.enabled};
this.authService.updateAccess(user.id,updateUserAccess).subscribe({
  next:(data)=>{
    console.log("Changed Access"+data.enabled);
       this.message = "User Access Updated Successfully";
    setTimeout(()=>{
    this.message='';
    },3000);
   
  },
  error:(error)=>{
    
    user.enabled=previousValue
    console.log("User not found",error);
    this.errorMessage=error.error.message;
    setTimeout(()=>{
      this.errorMessage='';
    },3000);
    
  }
})


  }
onFocus(value:any){
  this.oldValue=value;
}
  updateRole(user:any){
const previousRole = this.oldValue
const updateUserRole: UpdateUserRole={"role":user.role};
this.authService.updateRole(user.id,updateUserRole).subscribe({

  next:(data)=>{
    console.log(previousRole)
    console.log(updateUserRole)
    console.log("Role Updated Successfully",data);
this.message="User Role Updated Successfully";
    setTimeout(()=>{
      this.message='';
    },3000);
    
  },
  error:(error)=>{
    console.log(error);
    this.errorMessage=error.error.message;
    setTimeout(()=>{
this.errorMessage='';
    },3000)
    
  }
})

  }
}
