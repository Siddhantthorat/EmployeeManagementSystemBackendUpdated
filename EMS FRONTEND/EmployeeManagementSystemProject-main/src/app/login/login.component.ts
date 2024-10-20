import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName = ''
  password = ''
  invalidLogin = false
  message:String;
  constructor(private service:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }

 /* doLogin() {
    let resp = this.service.login(this.userName, this.password);
    resp.subscribe(data => {
      this.message = data;
      console.log(data);
   this.router.navigate(["/home"])
    });
  }*/

  
  doLogin() {

    this.service.authenticate(this.userName, this.password).subscribe(
      (data : any)=> {
        console.log(data);

        let resp = JSON.parse(data);

        let userDetails = resp.data;

        if(userDetails.roles=="ROLE_ADMIN"){

          Swal.fire('WELCOME ',userDetails.userName);
          
          this.router.navigate(['/home'])
        }

        else{
          Swal.fire('WELCOME ',userDetails.userName);
          this.router.navigate(['/user-home'])

        }

      },
      error => {

        this.message ="invalid credentials"

       

      }

    );




  }


  
  



  signup(){
    this.router.navigate(['signup']);
  }
}