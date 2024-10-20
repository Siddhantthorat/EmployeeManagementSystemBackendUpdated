import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  message:'';
  id: number
  employee: Employee
  constructor(private route: ActivatedRoute, 
    private router: Router, private employeService: EmployeeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employee = new Employee();
    this.employeService.getEmployeeById(this.id).subscribe((data : any) => {
      let resp = data;
      let status = resp['status'];
      let code = resp['code'];
      if(code=="0" && status=="Success")
      {
        this.employee = resp['data'];
      }
      else{
        this.message= resp['message'];
      }
    });
   
  }
  onback():void{
    this.router.navigate(['/employees']);
  }


}