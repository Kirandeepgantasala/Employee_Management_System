import { RedirectCommand, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { HrComponent } from './hr/hr.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { HomeredirectComponent } from './homeredirect/homeredirect.component';
import { HrhomeComponent } from './hrhome/hrhome.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: SignupComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] },

    children: [
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    data: { roles: ['EMPLOYEE'] },
  },
  {
    path: 'reset-password/:token',
    component: PasswordresetComponent,
  },
  {
    path: 'employees',
    component: HrComponent,
    canActivate: [authGuard],
    data: { roles: ['HR'] },
    children: [
      { path: '', component: HrhomeComponent },
      {
        path: 'createEmployee',
        component: CreateEmployeeComponent,
        canActivate: [authGuard],
      },
      {
        path: 'employeesList',
        component: EmployeesListComponent,
        canActivate: [authGuard],
      },
      {
        path: 'updateEmployee/:id',
        component: UpdateEmployeeComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'access-denied',
    component: AccessdeniedComponent,
  },
  { path: 'forgot-password',
    component: ForgotPasswordComponent 
},
  {
    path: '',
    component: HomeredirectComponent,
  },
];
