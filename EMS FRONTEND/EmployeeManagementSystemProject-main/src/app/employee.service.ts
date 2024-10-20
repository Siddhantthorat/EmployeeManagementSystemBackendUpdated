import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Employee } from './employee';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 private baseURL = "http://employeemanagementsystem.us-east-1.elasticbeanstalk.com";
 // private baseURL = "http://employee-management-system.us-east-1.elasticbeanstalk.com/employee";
 

  constructor(private httpClient:HttpClient) { }

  
/*  authenticate(userName: string, password: string) {
    console.log(userName);
    console.log(password);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userName + ':' + password) });
    console.log(userName);
    console.log(password);
    return this.httpClient.get('http://localhost:8080/employeeLogin',{headers,responseType: 'text' as 'json'}).pipe(
     map(
       userData => {
        sessionStorage.setItem('userName',userName);
        sessionStorage.setItem('password',password);
        return userData;
       }
     )

    );
  }
*/
  
/*login(){
  let userName=sessionStorage.getItem('userName');
  let password=sessionStorage.getItem('password');
  const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userName + ':' + password) });
  return this.httpClient.get("http://localhost:8080/employeelogin",{headers,responseType: 'text' as 'json'})
  
}*/


  getEmployeesList(): Observable<any>{
    let userName=sessionStorage.getItem('userName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userName + ':' + password) });
    return this.httpClient.get<Employee[]>(`${this.baseURL}/employee`,{headers});
  }

  createEmployee(employee: Employee): Observable<Object>{
    let userName=sessionStorage.getItem('userName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userName + ':' + password) });
    return this.httpClient.post(`${this.baseURL}/employee`, employee,{headers});
  }
//responseType:class or enity
  getEmployeeById(id: number): Observable<Employee>{
    let userName=sessionStorage.getItem('userName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userName + ':' + password) });
    return this.httpClient.get<Employee>(`${this.baseURL}/employee/${id}`,{headers});
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    let userName=sessionStorage.getItem('userName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userName + ':' + password) });
    return this.httpClient.put(`${this.baseURL}/employee/${id}`, employee,{headers});
  }

  deleteEmployee(id: number): Observable<Object>{
    let userName=sessionStorage.getItem('userName');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userName + ':' + password) });
    return this.httpClient.delete(`${this.baseURL}/employee/${id}`,{headers});
}

signup(user :User): Observable<Object>
{
  return this.httpClient.post("http://employeemanagementsystem.us-east-1.elasticbeanstalk.com/register",user);
}

}
