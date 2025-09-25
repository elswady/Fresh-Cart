import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/products';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../wishlist/services/wish-list.service';


@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  products: product[] = []
  addingSuccess: boolean = false
  wishListIds: Set<string> = new Set<string>()

  private readonly productService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService)
  private readonly wishListServise = inject(WishListService)

  ngOnInit(): void {
    this.getAllProducts()
    // Subscribe to wishlist ids and load initial state
    this.wishListServise.wishListIds.subscribe({
      next: (ids) => this.wishListIds = new Set(ids)
    })
    this.wishListServise.loadLoggedUserWishList()
  }

  getAllProducts(){
    this.productService.getProducts().subscribe({
      next: (res) =>{
        this.products = res.data
      }
    })
  }

  addToCart(id: string){
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

  addToWishList(id: string){
    this.wishListServise.addProductToWishList(id).subscribe({
      next: (res) =>{
        if(res.status == 'success'){
          this.wishListServise.wishListCount.next(res.data.length)
          // Refresh ids so UI updates heart state
          this.wishListServise.loadLoggedUserWishList()
          this.addingSuccess = true
          this.toastr.success(res.message, '',{
            progressBar:true,
            timeOut: 900
          })
        }
      }
    })
  }
}
