import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddPhotoPage } from './add-photo.page';
// import { SearchFiltersPage } from './add-photo-filters/add-photo-filters.page';

const routes: Routes = [
  {
    path: '',
    component: AddPhotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddPhotoPage],
  // entryComponents: [ SearchFiltersPage ]
})
export class AddPhotoPageModule {}
