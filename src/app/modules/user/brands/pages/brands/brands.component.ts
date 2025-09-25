import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { Data } from '../../models/brands.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  brandsData: Data[] = []

  private readonly brandsService = inject(BrandsService)

  ngOnInit(): void {
    this.getBrandsData()
  }

  getBrandsData(){
    this.brandsService.getAllBrands().subscribe({
      next: (res) =>{
        this.brandsData = res.data
      }
    })
  }
}
