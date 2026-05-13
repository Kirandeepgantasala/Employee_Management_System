import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthResponse } from './model/AuthResponse';
import { Observable, tap } from 'rxjs';

import { RegisterRequest } from './model/RegisterRequest';
import { RegisterResponse } from './model/RegisterResponse';
import { UserResponse } from './model/UserResponse';
import { UpdateUserRole } from './model/UpdateUserRole';
import { UpdateUserStatus } from './model/UpdateUserStatus';
import { Router } from '@angular/router';
import { LoginRequest } from './model/loginRequest';
import { EmployeeResponse } from './model/EmployeeResponse';
import { PasswordResetRequest } from './model/PasswordResetRequest';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }
base_url="http://localhost:8080/employees";
  url="http://localhost:8080/auth/login";
register_url="http://localhost:8080/auth/register";

users_url = "http://localhost:8080/users";


  login(loginRequest:LoginRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.url, loginRequest).pipe(
     tap((response: any)=>{
            localStorage.setItem("userDetails", JSON.stringify(response))
          })
        );
  }

  logout(){
  localStorage.removeItem("userDetails");
  this.router.navigate(['/login']);
}

getToken():string | null{
  const user =  localStorage.getItem('userDetails');
  return user ? JSON.parse(user).token:null;
}

isLoggedin(){
  return !!this.getToken();
}

register(registerRequest:RegisterRequest):Observable<RegisterResponse>{

  return this.http.post<RegisterResponse>(this.register_url,registerRequest);
}

resetPassword(token:string,passwordResetRequest:PasswordResetRequest):Observable<string>{
return this.http.post<string>(`http://localhost:8080/auth/reset-password/${token}`,passwordResetRequest);
}





// promoteToHR(id:Number):Observable<User>{
//   return this.http.patch<User>
//   (`${this.users_url}/${id}/promote-to-hr`,
//     {}
//   );
// }

getAllUsers():Observable<UserResponse[]>{
  return this.http.get<UserResponse[]>(`${this.users_url}/allusers`);
}

updateRole(id:number,updateUserRole:UpdateUserRole):Observable<UserResponse>{

 return this.http.patch<UserResponse>(`${this.users_url}/${id}/role`,updateUserRole);
}

updateAccess(id:number,updateUserStatus:UpdateUserStatus):Observable<UserResponse>{
return this.http.patch<UserResponse>(`${this.users_url}/${id}/status`,updateUserStatus);

}



getSavedUser(){
  const userData = localStorage.getItem("userDetails");
  return userData ? JSON.parse(userData):null;
}

getEmail(){
  return this.getSavedUser()?.email;
}

getRole(){
  return this.getSavedUser()?.role;
}




}