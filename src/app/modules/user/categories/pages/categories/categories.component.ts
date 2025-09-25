import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Data } from '../../models/categories.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  categoriesData: Data[] =  []

  private readonly categoriesService = inject(CategoriesService)

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe({
      next: (res) =>{
        this.categoriesData = res.data
        console.log(this.categoriesData);
      }
    })
  }

}
