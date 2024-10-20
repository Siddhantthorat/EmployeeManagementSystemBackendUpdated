import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { __param } from 'tslib';

import { Employee } from '../employee';

import { EmployeeService } from '../employee.service';





@Component({

  selector: 'app-create-employee',

  templateUrl: './create-employee.component.html',

  styleUrls: ['./create-employee.component.css']

})

export class CreateEmployeeComponent implements OnInit{

 

  employee: Employee = new Employee();
  msg:string;
  //resp:any;
  constructor(private employeeService: EmployeeService,

    private router: Router) {}

  /*  public responses ={

      code:'',
    
      status:'',
    
      message:'',
      firstName:'',
      lastName:'',
      department:'',
      designation:'',
      phoneNo:'',
      email:'',
      address:'',
      errorParams:'',

    
    };
    
*/
    onback():void{

      this.router.navigate(['/employees']);

    }

  ngOnInit(): void{



  }

 /*

  saveEmployee(){

    this.employeeService.createEmployee(this.employee).subscribe((data : any) => {
      let a=data;
       this.resp = data;
     this.responses= JSON.parse(this.resp);
      console.log(data);

   //   let status = resp['status'];
    //  let code = resp['code'];

      let status = this.responses.status;

      let code = this.responses.code;

     let firstName= this.responses.firstName;
     let lastName= this.responses.lastName;

     let  department= this.responses. department;
     let  designation= this.responses. designation;
     let  phoneNo= this.responses. phoneNo;
     let email= this.responses.email;
     let address= this.responses.address;
      console.log();

      console.log(status);
      console.log(code);

      if(code=="1" && status=="Failure"){

       

      //  let errorParam = this.resp['errorParams'];
        let errorParam = a.errorParams;
        console.log(errorParam);

        let errorMessage = '';

        if(errorParam.firstName!=undefined){
          console.log(errorParam.firstName);
          errorMessage = errorMessage + errorParam.firstName;
          
        }

       if(lastName!=undefined){

          errorMessage = errorMessage +','+ errorParam.lastName;

        }

        if(department!=undefined){

          errorMessage = errorMessage +','+ errorParam.department;
          console.log(errorMessage);
        }

       if(designation!=undefined){

          errorMessage = errorMessage +','+ errorParam.designation;

        }

        if(phoneNo!=undefined){

          errorMessage = errorMessage +','+ errorParam.phoneNo;

        }

        if(email!=undefined){

          errorMessage = errorMessage +','+ errorParam.email;

        }

        

       if(address!=undefined){

          errorMessage = errorMessage +','+ errorParam.address;

        }

        Swal.fire('Employee registration failed',errorMessage,'error');

      }

      else if(code=="0" && status=="Success"){

        Swal.fire('Employee created Sucessfully',data.message,'success').then(function(){

          window.location.href ="/employees";

        })

      }

    });

  }
*/



saveEmployee(){

  this.employeeService.createEmployee(this.employee).subscribe((data : any) => {

    let resp = data;
    //JSON.parse(resp);
    console.log(data);

    let status = resp.status;

    let code = resp.code;

    console.log(resp);

    console.log(status);
    console.log(code);


    if(code==1 && status=="Failure"){

     

      let errorParam = resp.errorParams;
      console.log(errorParam);
      

      let errorMessage = '';

      if(errorParam.firstName!=undefined){

        errorMessage = errorMessage + errorParam.firstName;

      }

     if(errorParam.lastName!=undefined){

        errorMessage = errorMessage +','+ errorParam.lastName;

      }

      if(errorParam.department!=undefined){

        errorMessage = errorMessage +','+ errorParam.department;

      }

     if(errorParam.designation!=undefined){

        errorMessage = errorMessage +','+ errorParam.designation;

      }

      if(errorParam.phoneNo!=undefined){

        errorMessage = errorMessage +','+ errorParam.phoneNo;

      }

      if(errorParam.email!=undefined){

        errorMessage = errorMessage +','+ errorParam.email;

      }

     

     if(errorParam.address!=undefined){

        errorMessage = errorMessage +','+ errorParam.address;

      }

      Swal.fire('Employee registration failed',errorMessage,'error');

    }

    else if(code==0 && status=="Success"){

      Swal.fire('Employee created Sucessfully',data.message,'success').then(function(){

        window.location.href ="/employees";

      })

    }

  });

}

  onSubmit(){

    console.log(this.employee);

    this.saveEmployee();

  }

   




}