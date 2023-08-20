import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username, password) {
    if(username === "yogi" && password === "password") {
      sessionStorage.setItem("userLoggedIn",username)
      return true
    } else {
      return false
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticateUser")
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem("authenticateUser")
  }
}
