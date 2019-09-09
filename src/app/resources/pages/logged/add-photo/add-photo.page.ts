import { Component, OnInit } from '@angular/core';
// import { RecipesDataService } from '../../../../services/data/recipes.data.service';
// import { Recipe } from '../../../../models/photo.model';
//import { ReminderModalPage } from '../reminders/reminder-modal/reminder-modal.page';
import { ModalController } from '@ionic/angular';
// import { SearchFiltersPage } from './add-photo-filters/add-photo-filters.page';
// import { Ingredient } from '../../../../models/ingredient.model';

@Component({
    selector: 'app-search',
    templateUrl: './add-photo.page.html',
    styleUrls: [ './add-photo.page.scss' ],
})
export class AddPhotoPage implements OnInit
{
    // results: Array<Recipe> = [];
    // add-photo: string = "";
    // inProgress: boolean = false;
    // ingredients: Array<Ingredient> = [];

    constructor(
        // private recipesDataService: RecipesDataService,
                private modalController: ModalController) { }

    ngOnInit() {}

    // private getData() : void
    // {
    //     this.inProgress = true;
    //     this.recipesDataService
    //         .searchRecipes(this.add-photo, this.ingredients.map(ingredient => ingredient.key))
    //         .subscribe(data => {
    //
    //             this.inProgress = false;
    //             this.results = data.results;
    //         });
    // }
    //
    // onSearch() : void
    // {
    //     this.getData();
    // }
    //
    // onFilter()
    // {
    //     this.modalController.create({
    //         component: SearchFiltersPage,
    //         componentProps: { ingredients: this.ingredients }
    //     })
    //     .then(modal => {
    //         modal.present();
    //         return modal.onDidDismiss()
    //     })
    //     .then(result => {
    //         this.ingredients = result.data.ingredients;
    //         this.getData();
    //     });
    // }
}
