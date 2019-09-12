import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../services/core/auth.service';
import { Photo } from '../../../../models/photo.model';
import { UsersDataService } from '../../../../services/data/users.data.service';
import { PhotosDataService } from '../../../../services/data/photos.data.service';
import { User } from '../../../../models/user.model';

@Component({
    selector: 'app-home',
    templateUrl: './photos.page.html',
    styleUrls: [ './photos.page.scss' ],
})
export class PhotosPage implements OnInit
{
    inProgress: boolean = false;
    results: Array<Photo> = [];

    constructor(private authService: AuthService, private usersDataService: UsersDataService, private photosDataService: PhotosDataService) { }

    ngOnInit()
    {
        if(!this.authService.logged)
            this.authService.user.subscribe(() => this.getData())
        else
            this.getData();

    }

    getData()
    {
        this.inProgress = true;
        this.usersDataService.getUser(this.authService.logged.id)
            .valueChanges()
            .subscribe((user: User) => {
                this.inProgress = false;

                if(user.photos)
                {
                    this.results = Object.keys(user.photos).map(key => {
                        const photo = user.photos[key];
                        photo.key = key;
                        return photo;
                    });
                }
                else
                    this.results = [];
            });
    }

    onRemove(photo: Photo) : void
    {
        this.photosDataService.removePhoto(photo);
        this.usersDataService.removePhoto(this.authService.logged.id, photo);
    }


}
