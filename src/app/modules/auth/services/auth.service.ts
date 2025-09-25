import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  register(data: any): Observable<any>{
    return this.http.post(environment.apiUrl + 'auth/signup', data)
  }

  logIn(data: any): Observable<any>{
    return this.http.post(environment.apiUrl + 'auth/signin', data)
  }

  saveToken(token: string){
    if(typeof window != "undefined"){
      localStorage.setItem('token', token)
      localStorage.setItem('userToken', token)
    }
  }

  getToken(): string | null{
    if(typeof window != "undefined"){
      return localStorage.getItem('token') ?? localStorage.getItem('userToken')
    }else{
      return null
    }
  }

  isLoggedIn(){
    return !! this.getToken()
  }

  logout(){
    if(typeof window != "undefined"){
      this.router.navigate(['/login'])
      localStorage.removeItem('token')
      localStorage.removeItem('userToken')
    }
  }

  submitVerifyEmail(data: object): Observable<any>{
    return this.http.post(environment.apiUrl + 'auth/forgotPasswords', data)
  }

  submitVerifyCode(data: object): Observable<any>{
    return this.http.post(environment.apiUrl + 'auth/verifyResetCode', data)
  }

  submitResetPassword(data: object): Observable<any>{
    return this.http.put(environment.apiUrl + 'auth/resetPassword', data)
  }
}
