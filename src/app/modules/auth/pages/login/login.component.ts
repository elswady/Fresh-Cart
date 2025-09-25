import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [ErrorMessageComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  errorMsg: string = ''
  isLoading: boolean = false
  authForm!: FormGroup
  isShowPassword : boolean = true

  private readonly authServices = inject(AuthService)
  private readonly router = inject(Router)
  private readonly formBuilder = inject(FormBuilder)

  showPassword(){
    this.isShowPassword = !this.isShowPassword
  }

  ngOnInit(): void {
   this.formInit()
 }

  formInit(){
    this.authForm = this.formBuilder.group ({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  })
  }

 getValue(){
  if(this.authForm.valid){
    this.isLoading = true
    this.authServices.logIn(this.authForm.value).subscribe({
      next: (res) =>{
        this.isLoading = false
        if(res.message == "success"){
          this.authServices.saveToken(res.token)
          this.router.navigate(['/home'])
        }
      },error: (error) =>{
        this.errorMsg = error.error.message
        this.isLoading = false
      }
    })
  }else{
    this.authForm.markAllAsTouched()
  }
 }


}
