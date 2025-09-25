import { Component, inject, OnInit } from '@angular/core';
import { WishListCardComponent } from "../../components/wish-list-card/wish-list-card.component";
import { WishList } from '../../models/wish-list.interface';
import { WishListService } from '../../services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-wish-list',
  imports: [WishListCardComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{

  wishListDetails: WishList = {} as WishList
  isLoading: boolean = false

  private readonly wishListService = inject(WishListService)
  private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService)

  ngOnInit(): void {
    this.getLoggedUserWishList()
  }

  getLoggedUserWishList(){
    this.wishListService.getLoggedUserWishList().subscribe({
      next: (res) =>{
         this.wishListService.wishListCount.next(res.count)
        this.wishListDetails = res
        this.isLoading = true
      }
    })
  }

  removItemFromWishList(id: string){
    this.wishListService.removeProductFromWishList(id).subscribe({
      next: (res) =>{
        this.toastr.warning('Product deleted!')
        this.getLoggedUserWishList()
      }
    })
  }

  addProductToCart(id: string){
    this.cartService.addProductToCart(id).subscribe({
      next: (res) =>{
        this.cartService.cartCounter.next(res.numOfCartItems)
         if(res.status == 'success'){
          this.toastr.success(res.message, '',{
            progressBar:true,
            timeOut: 900
          });
        }
      }
    })
  }

}
