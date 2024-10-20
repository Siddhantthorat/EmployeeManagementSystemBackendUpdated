import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  message:string;
  employees : Employee[];



  constructor(private employeeService : EmployeeService,

    private router: Router) { }

    public responses ={

      code:'',
    
      status:'',
    
      message:'',
    
    };

  ngOnInit(): void{

    this.getEmployees();

  }



  private getEmployees(){
    
    this.employeeService.getEmployeesList().subscribe(data =>{
      const resp = data;
      const status = resp['status'];
      const code = resp['code'];
      if(code=="0" && status=="Success")
      {
        this.employees = resp['data'];
      }
      else{
        this.message= resp['message'];
      }

    });

  }
  onback():void{

    this.router.navigate(['/user-home']);

  }
}
