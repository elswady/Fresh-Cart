import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/cart.interface';

@Component({
  selector: 'cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  @Input() product: Product = {} as Product
  @Output() removeItem = new EventEmitter<string>()
  @Output() updateQuantity = new EventEmitter<{id: string, count: number}>()

  onRemoveItem(){
    this.removeItem.emit(this.product.product._id)
  }

  onUpdateQuantity(count: number){
    this.updateQuantity.emit({id:this.product.product._id, count})
  }
}
