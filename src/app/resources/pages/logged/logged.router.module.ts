import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedPage } from './logged.page';


const routes: Routes = [
    {
        path: '',
        component: LoggedPage,
        children: [
            {
                path: 'photos',
                children: [
                    {
                        path: '',
                        loadChildren: './photos/photos.module#PhotosPageModule'
                    }
                ]
            },
            {
                path: 'add-photo',
                children: [
                    {
                        path: '',
                        loadChildren: './add-photo/add-photo.module#AddPhotoPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/logged/photos',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class LoggedRouterModule
{
}
