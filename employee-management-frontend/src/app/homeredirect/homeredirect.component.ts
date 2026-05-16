import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeredirect',
  standalone: true,
  imports: [],
  templateUrl: './homeredirect.component.html',
  styleUrl: './homeredirect.component.css'
})
export class HomeredirectComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
   const role = this.authService.getRole();
    if(!this.authService.isLoggedin()){
      this.router.navigate(['/login']);
      return;
    }

    if(role ==="ADMIN"){
      this.router.navigate(['/admin']);
    }
    else if(role==="HR"){
      this.router.navigate(['/employees']);
    }
    else{
      this.router.navigate(['/profile']);
    }

  }


}
