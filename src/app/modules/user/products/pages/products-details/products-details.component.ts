import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/products';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../wishlist/services/wish-list.service';

@Component({
  selector: 'app-products-details',
  imports: [CommonModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss'
})
export class ProductsDetailsComponent implements OnInit{

  id: any;
  product: product = {} as product
  wishListIds: Set<string> = new Set<string>()

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly wishListService = inject(WishListService)
  private readonly toastr = inject(ToastrService)

  ngOnInit(): void {
    this.getId()
    this.getProductById()
    // Subscribe and load wishlist ids so heart reflects state
    this.wishListService.wishListIds.subscribe({
      next: (ids) => this.wishListIds = new Set(ids)
    })
    this.wishListService.loadLoggedUserWishList()
  }

  getId(){
    this.activatedRoute.paramMap.subscribe({
      next: (value) =>{
        this.id = value.get('id')
      }
    })
  }

  getProductById(){
    this.productsService.getProductsWithId(this.id).subscribe({
      next: (res) =>{
        this.product = res.data
      }
    })
  }

  addItemToCart(id: string){
    this.cartService.addProductToCart(id).subscribe({
      next: (res) =>{
        if(res.status == 'success'){
          this.cartService.cartCounter.next(res.numOfCartItems)
          this.toastr.success(res.message, '',{
            progressBar:true,
            timeOut: 900
          });
        }
      }
    })
  }

  addItemToWishList(id: string){
    this.wishListService.addProductToWishList(id).subscribe({
     next: (res) => {
       if(res.status == 'success'){
        this.wishListService.wishListCount.next(res.data.length)
        // Refresh ids so UI updates heart state
        this.wishListService.loadLoggedUserWishList()
        this.toastr.success(res.message, '',{
            progressBar:true,
            timeOut: 900
          })
      }
     }
    })
  }
}
