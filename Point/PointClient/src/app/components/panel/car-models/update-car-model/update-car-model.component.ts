import { CategoriesService } from './../../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarCategoryModel, CarsModel } from 'src/app/components/search-car/models/cars.model';
import { store } from 'src/app/redux/store';
import { CarModelsService } from 'src/app/services/car-models.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-update-car-model',
  templateUrl: './update-car-model.component.html',
  styleUrls: ['./update-car-model.component.scss']
})
export class UpdateCarModelComponent implements OnInit {

  carModel: CarsModel = new CarsModel();

  categories: CarCategoryModel[];
  selectedCategoryID: number;

  form: FormGroup = new FormGroup({
    manufacturer: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])),
    modalName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10)])),
    priceDay: new FormControl('', Validators.compose([Validators.required, Validators.min(50), Validators.max(1000)])),
    priceLateDay: new FormControl('', Validators.compose([Validators.required, Validators.min(50), Validators.max(1000)])),
    category: new FormControl('1', Validators.required),
  });


  constructor(
    private myActivatedRoute: ActivatedRoute,
    private carModelsService: CarModelsService,
    private categoriesService: CategoriesService,
  ) { }

  async ngOnInit() {
    const id = +this.myActivatedRoute.snapshot.params.id;
    await this.carModelsService.getOneCarModel(id);
    this.carModel = store.getState().carsModel;

    this.categories = await this.categoriesService.getAllCategories();
    this.selectedCategoryID = this.carModel.cModelCatID;

  }

  public async updateCarModel(){
    this.carModel.cModelCatID = this.selectedCategoryID;

    console.log(this.carModel);
    this.carModel.cModelCat = this.categories.find(c => c.catID === this.selectedCategoryID);

    await this.carModelsService.UpdateCarModel(this.carModel.cModelID, this.carModel);

    var notyf = new Notyf();
    notyf.success('Your have successfully updated!');
  }
}
