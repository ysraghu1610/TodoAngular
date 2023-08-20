import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username=""
  password=""
  errorMessage = "invalid credentials"
  invalidCredentials = false;

  constructor(private router : Router,
    private hardcodedAuthenticationService : HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit() {
  }

  handleLogin() {
    console.log("handle login")
    console.log(this.username)
    console.log("password", this.password)

    if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      this.invalidCredentials = false;
      this.router.navigate(["welcome", this.username])
    } else {
      this.invalidCredentials = true;
    }
  }

  handleBasicAuthLogin() {
    console.log("handle basic auth login")
    console.log("handleBasicAuthLogin username", this.username)
    console.log("handleBasicAuthLogin password", this.password)

    if(this.basicAuthenticationService.handleLogin(this.username, this.password)) {
      this.invalidCredentials = false;
      this.router.navigate(["welcome", this.username])
    } else {
      this.invalidCredentials = true;
    }

    this.basicAuthenticationService.handleLogin(this.username, this.password).subscribe(
      response => {
        console.log("success ", response)
        this.invalidCredentials = false;
        this.router.navigate(["welcome", this.username])
      },
      error => {
        console.log("error ", error)
        this.invalidCredentials = true;
      }
    )
  }

  handleJWTAuthLogin() {
    console.log("handle jwt auth login")
    this.basicAuthenticationService.handleJWTLogin(this.username, this.password).subscribe(
      response => {
        console.log("success ", response)
        this.invalidCredentials = false;
        this.router.navigate(["welcome", this.username])
      },
      error => {
        console.log("error ", error)
        this.invalidCredentials = true;
      }
    )
  }
}
