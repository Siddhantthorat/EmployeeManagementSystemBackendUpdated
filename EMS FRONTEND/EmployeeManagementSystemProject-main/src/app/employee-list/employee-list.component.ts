import { Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';

import { Employee } from '../employee';

import { EmployeeService } from '../employee.service';

import Swal from 'sweetalert2';


@Component({

  selector: 'app-employee-list',

  templateUrl: './employee-list.component.html',

  styleUrls: ['./employee-list.component.css']

})



export class EmployeeListComponent implements OnInit {

  message:any;
  employees : Employee[];



  constructor(private employeeService : EmployeeService,

    private router: Router) { }

    public responses ={

      code:'',
    
      status:'',
    
      message:'',
    
    };

    onBackButtonClick():void{

      this.router.navigate(['/home']);

    }

   

  ngOnInit(): void{

    this.getEmployees();

  }



  private getEmployees(){
    
    this.employeeService.getEmployeesList().subscribe(data =>{
      let resp = data;
      let status = resp['status'];
      let code = resp['code'];
      if(code=="0" && status=="Success")
      {
        this.employees = resp['data'];
      }
      else{
        this.message= resp['message'];
      }

    });

  }



  employeeDetails(id: number){

    this.router.navigate(['employee-details',id])

  }



  updateEmployee(id: number){

    this.router.navigate(['update-employee',id])

  }



  deleteEmployee(id: number){

    if(confirm("Are you sure to delete Id: "+id)) {

    this.employeeService.deleteEmployee(id).subscribe(data => {
   
      this.message=data;
      
     
     console.log(this.responses.message);
     
  Swal.fire('Employee deleted Successfully!!!',this.responses.message ,'success');
    this.getEmployees();

    })

  }}


  goHome() {
    this.router.navigate(['/home']);  // Adjust the route as needed
  }



}