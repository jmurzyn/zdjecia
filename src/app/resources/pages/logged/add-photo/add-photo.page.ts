import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PhotosDataService } from '../../../../services/data/photos.data.service';
import { UsersDataService } from '../../../../services/data/users.data.service';
import { AuthService } from '../../../../services/core/auth.service';

@Component({
    selector: 'app-search',
    templateUrl: './add-photo.page.html',
    styleUrls: [ './add-photo.page.scss' ],
})
export class AddPhotoPage
{
    photo: SafeResourceUrl = null;
    image: string = null;
    position: Position = null;
    location: string = null;

    // @ts-ignore
    @ViewChild('map') mapElement: ElementRef;
    map: any;

    constructor(
        private sanitizer: DomSanitizer,
        private photosDataService: PhotosDataService,
        private usersDataService: UsersDataService,
        private authService: AuthService
    ) { }

    async onSave()
    {
        const photo = await this.photosDataService.uploadPhoto(this.image, this.position.coords.latitude, this.position.coords.longitude, this.location);
        this.usersDataService.addPhoto(this.authService.logged.id, photo);
    }

    async takePicture()
    {
        const image = await Plugins.Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera
        });

        this.image = image.dataUrl;
        this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
        this.getCurrentPosition()
    }

    async getCurrentPosition()
    {
        const coordinates = <Position>await Plugins.Geolocation.getCurrentPosition();
        this.position = coordinates;
        this.locatePlace();
    }

    locatePlace()
    {
        this.map = new google.maps.Map(this.mapElement.nativeElement);
        let service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch({
            location: new google.maps.LatLng(this.position.coords.latitude, this.position.coords.longitude),
            radius: 500,
            types: [ "" ]
        }, (results, status) => {
            if(Array.isArray(results) && results[0])
                this.location = results[0].name;
        });
    }


}
