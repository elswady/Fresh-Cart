import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { product } from '../../models/products';

@Component({
  selector: 'product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: product = {} as product
  @Input() addingSuccess!: boolean
  @Input() inWishList: boolean = false
  @Output() addToCart = new EventEmitter<string>()
  @Output() addToWishList = new EventEmitter<string>()

  onAddToWishList(){
    this.addToWishList.emit(this.product._id)
  }

  onAddToCart(){
    this.addToCart.emit(this.product._id)
  }

}
