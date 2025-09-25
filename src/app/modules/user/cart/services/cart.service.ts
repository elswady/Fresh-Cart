import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { AuthService } from '../../../auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private authService: AuthService) { }

  addProductToCart(productId: string): Observable<any>{
    return this.http.post(environment.apiUrl + 'cart', {
      productId
    })
  }

  updateCartProduct(productId: string, count: number): Observable<any>{
    return this.http.put(environment.apiUrl + `cart/${productId}`, {
      count
    })
  }

  getLoggedUserCart(): Observable<any>{
    return this.http.get(environment.apiUrl + 'cart')
  }

  removeCartItem(productId: string): Observable<any>{
    return this.http.delete(environment.apiUrl + `cart/${productId}`)
  }

  clearCart(): Observable<any>{
    return this.http.delete(environment.apiUrl + 'cart')
  }
}
