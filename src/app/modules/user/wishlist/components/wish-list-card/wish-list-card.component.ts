import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Data } from '../../models/wish-list.interface';

@Component({
  selector: 'wish-list-card',
  imports: [],
  templateUrl: './wish-list-card.component.html',
  styleUrl: './wish-list-card.component.scss'
})
export class WishListCardComponent{

  @Input() productData: Data = {} as Data
  @Output() removeItemFromWishList = new EventEmitter<string>()
  @Output() addItemToCart = new EventEmitter<string>()

  removeFromWishList(){
    this.removeItemFromWishList.emit(this.productData._id)
  }

  onAddItemToCart(){
    this.addItemToCart.emit(this.productData._id)
  }
}
