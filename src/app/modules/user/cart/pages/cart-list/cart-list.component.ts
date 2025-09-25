import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CartItemComponent } from "../../components/cart-item/cart-item.component";
import { Cart } from '../../models/cart.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit {

  cartDetails: Cart = {} as Cart
  isLoading: boolean = false

  private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService)

  ngOnInit(): void {
    this.loadCartItems()
  }

  loadCartItems(){
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) =>{
        this.cartDetails = res
        this.isLoading = true
      }
    })
  }

  RemoveItem(id:string){
    this.cartService.removeCartItem(id).subscribe({
      next: (res) =>{
        this.cartService.cartCounter.next(res.numOfCartItems)
        this.toastr.warning('Product deleted!')
        this.cartDetails = res
      }
    })
  }

  updateQuantity(id:string, count:number){
    this.cartService.updateCartProduct(id, count).subscribe({
      next: (res) =>{
         this.cartService.cartCounter.next(res.numOfCartItems)
        this.toastr.success('Product updated!')
        this.cartDetails = res
      }
    })
  }

  clearCart(){
    this.cartService.clearCart().subscribe({
      next: (res) =>{
        console.log(res);
        if(res.message == 'success'){
          this.loadCartItems()
        }
      }
    })
  }

}
