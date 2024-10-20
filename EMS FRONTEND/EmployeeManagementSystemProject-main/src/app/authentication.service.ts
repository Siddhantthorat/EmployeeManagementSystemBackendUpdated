import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient:HttpClient)
    {
   
   }


     authenticate(userName: string, password: string) {
      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userName + ':' + password) });

      return this.httpClient.get('http://employeemanagementsystem.us-east-1.elasticbeanstalk.com/login',{headers,responseType:'text' as 'json'}).pipe(

       map(

         userData => {

          sessionStorage.setItem('userName',userName);

          sessionStorage.setItem('password',password);

          return userData;

         }

       )

 

      );

    }

 




  isUserLoggedIn() {

    let user = sessionStorage.getItem('userName')

    console.log(!(user === null))

    return !(user === null)

  }




  logOut() {

    sessionStorage.removeItem('userName')

  }

}
