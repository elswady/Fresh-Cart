import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../modules/auth/services/auth.service';
import { CartService } from '../../../modules/user/cart/services/cart.service';
import { WishListService } from '../../../modules/user/wishlist/services/wish-list.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  isMobileMode: boolean = false
  cartCount: number = 0
  wishListCount: number = 0

  private readonly authService = inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly wishListService = inject(WishListService)

  @Input() authType: string = ''

  ngOnInit(): void {
    this.getCartCount()
    this.getWishListCount()

    if (this.authService.isLoggedIn()) {
      this.getUserCartCount()
      this.getUserWishListCount()
    }
  }

  getWishListCount(){
    this.wishListService.wishListCount.subscribe({
      next: (res) => {
        this.wishListCount = res
      }
    })
  }

  getUserWishListCount(){
    if (!this.authService.isLoggedIn()) return
    this.wishListService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishListCount = res.data.length
      }
    })
  }

  getUserCartCount(){
    if (!this.authService.isLoggedIn()) return
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartCount = res.numOfCartItems
      }
    })
  }

  getCartCount(){
    this.cartService.cartCounter.subscribe({
      next: (res) => {
        this.cartCount = res
      }
    })
  }

  toogleMobile(){
    this.isMobileMode = !this.isMobileMode
  }

  logout(){
    this.authService.logout()
  }

}
