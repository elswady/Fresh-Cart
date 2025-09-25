import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from "../../../../shared/components/error-message/error-message.component";

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{

  verifyEmail!: FormGroup
  verifycode!: FormGroup
  resetPassword!: FormGroup
  isShowPassword : boolean = true
  step: number = 1

   private readonly formBuilder = inject(FormBuilder)
   private readonly authService = inject(AuthService)
   private readonly router = inject(Router)

   ngOnInit(): void {
     this.initForm()
   }

   showPassword(){
    this.isShowPassword = !this.isShowPassword
  }

   initForm():void{
    this.verifyEmail = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]]
    })

      this.verifycode = this.formBuilder.group({
      resetCode: ['',[Validators.required]]
    })

      this.resetPassword = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    })
   }

   formStep1(){
    if(this.verifyEmail.valid){
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          if(res.statusMsg){
            this.step = 2
          }
        }
      })
    }
   }

    formStep2(){
    if(this.verifycode.valid){
      this.authService.submitVerifyCode(this.verifycode.value).subscribe({
        next: (res) => {
          if(res.status){
            this.step = 3
          }
        }
      })
    }
   }

   formStep3(){
    if(this.resetPassword.valid){
      this.authService.submitResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token)
          this.router.navigate(['/home'])
        }
      })
    }
   }

}
