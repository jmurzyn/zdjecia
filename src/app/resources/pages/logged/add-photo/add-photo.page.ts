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
    inProgress: boolean = false;

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
        this.inProgress = true;
        const photo = await this.photosDataService.uploadPhoto(this.image, this.position ? this.position.coords.latitude : null, this.position ? this.position.coords.longitude : null, this.location);
        this.usersDataService.addPhoto(this.authService.logged.id, photo)
            .then(() => {
                this.inProgress = false;
                this.clearValues();
            });
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

        //getting coordinates from GPS
        this.getCurrentPosition()
    }

    async getCurrentPosition()
    {
        this.inProgress = true;
        const coordinates = <Position>await Plugins.Geolocation.getCurrentPosition().catch(e => console.log(e));
        this.position = coordinates;
        this.inProgress = false;

        //getting place name from Google Places API
        this.locatePlace();
    }

    locatePlace()
    {
        if(this.position)
        {
            this.inProgress = true;
            this.map = new google.maps.Map(this.mapElement.nativeElement);
            let service = new google.maps.places.PlacesService(this.map);
            service.nearbySearch({
                location: new google.maps.LatLng(this.position.coords.latitude, this.position.coords.longitude),
                radius: 500,
                types: [ "" ]
            }, (results, status) => {

                this.inProgress = false;
                if(Array.isArray(results) && results[0])
                    this.location = results[0].name;
            });
        }
    }

    clearValues()
    {
        this.location = null;
        this.position = null;
        this.photo = null;
        this.image = null;
    }

}
