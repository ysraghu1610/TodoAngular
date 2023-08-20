import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let username = "user"
    // let password ="password"
    // let basicAuthenticationHeader ='Basic ' + window.btoa(username + ':' + password)
  
  let basicAuthenticationHeaderToken = this.basicAuthenticationService.getAuthenticatedToken()
  let authenticatedUser = this.basicAuthenticationService.getAuthenticatedUser()

  if(basicAuthenticationHeaderToken && authenticatedUser) {
    request = request.clone({
      setHeaders : {
        Authorization : basicAuthenticationHeaderToken
      }
    })
  }
  return next.handle(request)

  }


}
