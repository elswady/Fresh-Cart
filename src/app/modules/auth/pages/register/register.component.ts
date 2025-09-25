import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from "../../../../shared/components/error-message/error-message.component";
import { checkPasswordValid } from '../../../../shared/helper/password-match';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  errorMsg: string = ''
  isLoading: boolean = false
  authForm!: FormGroup
  isShowPassword: boolean = true
  isShowRePassword: boolean = true

  private readonly authServices = inject(AuthService)
  private readonly router = inject(Router)
  private readonly formBuilder = inject(FormBuilder)

  showPassword(){
    this.isShowPassword = !this.isShowPassword
  }

  showRePassword(){
    this.isShowRePassword = !this.isShowRePassword
  }

  formInit(){
    this.authForm = this.formBuilder.group ({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  },{validators: checkPasswordValid})
  }


 getValue(){
  if(this.authForm.valid){
    this.isLoading = true
    this.authServices.register(this.authForm.value).subscribe({
      next: (res) =>{
        this.isLoading = false
        if(res.message == "success"){
          this.router.navigate(['/login'])
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

 ngOnInit(): void {
   this.formInit()
 }

}
