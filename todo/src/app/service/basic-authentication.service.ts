import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { API_URL } from '../app.constants';

export class AuthenticationBean {
   message : string
}

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http : HttpClient) { }
  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticateUser")
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem("authenticateUser")
    sessionStorage.removeItem("authenticatToken")

  }

   handleLogin(username, password) {
    console.log('inside handleLogin of basic auth')
    let basicAuthenticationHeader = 'Basic '+ window.btoa(username +':'+ password)
    let headers = new HttpHeaders({
      Authorization : basicAuthenticationHeader
    }) 

    console.log('inside handleLogin header => ', headers.get('Authorization'))

    return this.http.get<AuthenticationBean>(
     `${API_URL}/basic-auth`,
     {headers}).pipe(
      map(
        data =>  {
          sessionStorage.setItem('authenticateUser', username)
          sessionStorage.setItem('authenticatedToken', basicAuthenticationHeader)
          return data
        }
      )
     )
  }

  handleJWTLogin(username, password) {
    console.log('inside handleJWTLogin of basic auth')
  
    return this.http.post<any>(
     `${API_URL}/authenticate`, {
      username,
      password
     }
      ).pipe(
      map(
        data =>  {
          sessionStorage.setItem('authenticateUser', username)
          sessionStorage.setItem('authenticatedToken', `Bearer ${data.token}`)
          return data
        }
      )
     )
  }

  getAuthenticatedUser() {
    let user = sessionStorage.getItem("authenticateUser")
    return user
  }

  getAuthenticatedToken() {
    let token = sessionStorage.getItem("authenticatedToken")
    return token
  }

}
