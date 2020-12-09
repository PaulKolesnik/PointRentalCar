import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { CarModelsService } from 'src/app/services/car-models.service';
import { CategoriesService } from './../../../../services/categories.service';
import { CarCategoryModel, CarsModel } from './../../../search-car/models/cars.model';

@Component({
  selector: 'app-new-car-model',
  templateUrl: './new-car-model.component.html',
  styleUrls: ['./new-car-model.component.scss']
})
export class NewCarModelComponent implements OnInit {

  public categories: CarCategoryModel[];
  public selectedCategoryID: number;

  public newCarModel: CarsModel = new CarsModel();

  form: FormGroup = new FormGroup({
    manufacturer: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])),
    modalName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10)])),
    priceDay: new FormControl('', Validators.compose([Validators.required, Validators.min(50), Validators.max(1000)])),
    priceLateDay: new FormControl('', Validators.compose([Validators.required, Validators.min(50), Validators.max(1000)])),
    category: new FormControl('1', Validators.required),
  });


  constructor(
    private categoriesService: CategoriesService,
    private carModelsService: CarModelsService,
    private myRouter: Router
  ) { }

  async ngOnInit() {
    await this.getAllCategories();
    this.selectedCategoryID = this.categories[0].catID;
  }

  onSubmit() {
    this.newCarModel.cModelCatID = this.selectedCategoryID;
    console.log(this.newCarModel);
    this.carModelsService.addCarModel(this.newCarModel);
    this.newCarModel.cModelCat = this.categories.find(c => c.catID === this.selectedCategoryID);
    var notyf = new Notyf();
    notyf.success('Your have successfully added!');

    setTimeout(() => {
      this.myRouter.navigateByUrl("/panel/car-models");

    }, 3000);


  }

  async getAllCategories() {
    this.categories = await this.categoriesService.getAllCategories();
  }

}
