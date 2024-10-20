import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private router:Router) { }

  onButtonClick(){
    this.router.navigate(['employees'])
  }

  onClick(){
    this.router.navigate(['create-employee'])
  }
}
