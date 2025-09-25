import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessageComponent } from '../../../../../shared/components/error-message/error-message.component';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-address',
  imports: [ErrorMessageComponent, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit{

  addressForm!: FormGroup
  isLoading: boolean = false
  cartId!: string

  private readonly orderService = inject(OrdersService)
  private readonly formBuilder = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) =>{
      this.cartId = res.get('id')!
    })

    this.formInit()
  }

  formInit(){
    this.addressForm = this.formBuilder.group({
      details: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]]
    })
  }

  getValue(){
    if(this.addressForm.valid){
      this.isLoading = true
      this.orderService.creatOrder(this.cartId, this.addressForm.value).subscribe({
        next: (res) =>{
          if(res.status = 'success'){
            this.isLoading = false
            open(res.session.url, '_self')
          }
        }
      })
    }else{
      this.addressForm.markAllAsTouched()
    }
  }
}
