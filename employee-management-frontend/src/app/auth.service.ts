import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthResponse } from './model/AuthResponse';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { RegisterRequest } from './model/RegisterRequest';
import { RegisterResponse } from './model/RegisterResponse';
import { UserResponse } from './model/UserResponse';
import { UpdateUserRole } from './model/UpdateUserRole';
import { UpdateUserStatus } from './model/UpdateUserStatus';
import { Router } from '@angular/router';
import { LoginRequest } from './model/LoginRequest';
import { EmployeeResponse } from './model/EmployeeResponse';
import { PasswordResetRequest } from './model/PasswordResetRequest';
import { ForgotPassword } from './model/ForgotPassword';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.getRole();
  }
  private url = 'https://employee-management-system-bg9v.onrender.com';
  // base_url = 'http://localhost:8080/employees';
  // url = 'http://localhost:8080/auth/login';


  // users_url = 'http://localhost:8080/users';

  private userSource = new BehaviorSubject<any>(this.getSavedUser());
  currentUser = this.userSource.asObservable();

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/auth/login`, loginRequest).pipe(
      tap((response: any) => {
        localStorage.setItem('userDetails', JSON.stringify(response));
      }),
    );
  }


  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.url}/auth/register`, registerRequest);
  }




  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.url}/users/allusers`);
  }


  resetPassword(
    token: string,
    passwordResetRequest: PasswordResetRequest,
  ): Observable<any> {
    return this.http.post<any>(
      `${this.url}/auth/reset-password/${token}`,
      passwordResetRequest,
    );
  }


  forgotPassword(forgotPassword: ForgotPassword):Observable<any> {
    return this.http.post<any>(
      `${this.url}/auth/forgot-password`,
      forgotPassword,
    );
  }



  updateRole(
    id: number,
    updateUserRole: UpdateUserRole,
  ): Observable<UserResponse> {
    return this.http.patch<UserResponse>(
      `${this.url}/users/${id}/role`,
      updateUserRole,
    );
  }

  updateAccess(
    id: number,
    updateUserStatus: UpdateUserStatus,
  ): Observable<UserResponse> {
    return this.http.patch<UserResponse>(
      `${this.url}/users/${id}/status`,
      updateUserStatus,
    );
  }





  logout() {
    localStorage.removeItem('userDetails');
    this.userSource.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const user = localStorage.getItem('userDetails');
    return user ? JSON.parse(user).token : null;
  }

  isLoggedin(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    return !this.isTokenExpired();
  }

  

  

  // promoteToHR(id:Number):Observable<User>{
  //   return this.http.patch<User>
  //   (`${this.users_url}/${id}/promote-to-hr`,
  //     {}
  //   );
  // }


  getSavedUser() {
    const userData = localStorage.getItem('userDetails');
    return userData ? JSON.parse(userData) : null;
  }

  getEmail() {
    return this.getSavedUser()?.email;
  }

  getRole() {
    return this.getSavedUser()?.role;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    const payload = JSON.parse(atob(token!.split('.')[1]));
    const expiryDate = new Date(payload.exp * 1000);
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem('userDetails');
      return true;
    }
    return false;
  }

  updateUserStatus() {
    const user = this.getSavedUser();
    this.userSource.next(user);
  }
}
