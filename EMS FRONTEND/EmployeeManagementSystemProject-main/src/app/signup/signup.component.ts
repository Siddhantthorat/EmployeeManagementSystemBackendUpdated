import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { EmployeeService } from '../employee.service';
import { User } from '../user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user: User = new User();
  //resp:any;
  //a:any;
  constructor(private employeeService: EmployeeService,

    private router: Router) {}

  onback():void{

    this.router.navigate(['/login']);

  }

ngOnInit(): void{



}

  saveUser(){

    this.employeeService.signup(this.user).subscribe((data : any) => {
   let resp=data;
   //JSON.parse(a);
  
   //    this.resp = data;
   //  this.responses= JSON.parse(this.resp);
   console.log(data);
   //let resp = JSON.parse(data);

   let userDetails = resp.data;

   if(resp.code==0 && resp.status=="Success"){
    Swal.fire('User Signup Successfull',resp.message,'success');
      this.router.navigate(['login']);
   }
   else if(resp.code==1 && resp.status=="Failure") {
    Swal.fire('User Already Exists',resp.message,'error');
   }

      
      
   //   let status = resp['status'];
    //  let code = resp['code'];


    });

  }


  onSubmit(){

    console.log(this.user);

    this.saveUser();

  }
}
