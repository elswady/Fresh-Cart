import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { environment } from '../../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishListCount: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  // Track the current wishlist product ids so UI can reflect red heart state
  wishListIds: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

  constructor(private http: HttpClient, private authService: AuthService) { }

  getLoggedUserWishList(): Observable<any>{
    return this.http.get(environment.apiUrl + 'wishlist')
  }

  // Load wishlist from server and populate ids/count subjects
  loadLoggedUserWishList(): void {
    if (!this.authService.isLoggedIn()) return
    this.getLoggedUserWishList().subscribe({
      next: (res) => {
        const ids: string[] = (res?.data || []).map((p: any) => p._id)
        this.wishListIds.next(ids)
        this.wishListCount.next(ids.length)
      }
    })
  }

  addProductToWishList(productId: string): Observable<any>{
    return this.http.post(environment.apiUrl + 'wishlist', {
      productId
    })
  }

  removeProductFromWishList(productId: string){
    return this.http.delete(environment.apiUrl + `wishlist/${productId}`)
  }

  // Helper to check if a product is currently in wishlist
  isInWishlist(productId: string): boolean {
    const ids = this.wishListIds.getValue()
    return ids.includes(productId)
  }
}
