import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get(environment.apiUrl + "products")
  }

  getProductsWithId(id: string): Observable<any>{
    return this.http.get(environment.apiUrl + "products/" + id)
  }
}
