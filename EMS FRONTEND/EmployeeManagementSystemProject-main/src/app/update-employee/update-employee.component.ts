import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

import { __param } from 'tslib';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  message:any;
  id: number;
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

   

    ngOnInit(): void{

      this.id = this.route.snapshot.params['id'];
  
      this.employeeService.getEmployeeById(this.id).subscribe((data : any) => {
  
        let resp = data;
  
        let status = resp['status'];
  
        let code = resp['code'];
  
        if(code==0 && status=="Success")
  
        {
  
          this.employee = resp['data'];
  
        }
  
        else{
  
          this.message= resp['message'];
  
        }
  
    },
  
      error => console.log(error));
  
  }

  updateEmployee()
  {
    this.employeeService.updateEmployee(this.id,this.employee).subscribe( (data:any) =>{
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
    
    this.updateEmployee();
  
  }

  onback(){
    
      this.goToEmployeeList();
    }
   
  
   

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }


}
