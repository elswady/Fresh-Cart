import { AbstractControl } from "@angular/forms"


export const checkPasswordValid = (control: AbstractControl) => {

    if(control.get('password')?.value == control.get('rePassword')?.value){
      return null
    }else{
      return{ misMatch: true}
    }
  }