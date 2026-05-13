import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
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

export const routes: Routes = [
    {   path:'login',
        component:LoginComponent},
    {   path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard]
    },
    {
        path:'register',
        component:SignupComponent
    },
    {
        path:'admin',
        component:AdminComponent,
        canActivate:[authGuard],

        children:[
            {
            path:'users',
            component:UsersComponent,
            canActivate:[authGuard]
            }
           
        ]

    },
    {
        path:'employee',
        component:EmployeeComponent,
        canActivate:[authGuard]

        
    },
    {
        path:'hr',
        component:HrComponent,
        canActivate:[authGuard]
    },
    {
        path:'profile',
        component:ProfileComponent,
        canActivate:[authGuard]

    },
    {
        path:'reset-password/:token',
        component:PasswordresetComponent,

    },
    {
        path:'employees',
        canActivate:[authGuard],
        children:[
            {path:'',redirectTo:'employeesList',pathMatch:'full'},
            {path:'createEmployee',component:CreateEmployeeComponent,canActivate:[authGuard]},
            {path:'employeesList',component:EmployeesListComponent,canActivate:[authGuard]},
            {
            path:'updateEmployee/:id',component:UpdateEmployeeComponent,canActivate:[authGuard]
            }
        ]
    }
];
