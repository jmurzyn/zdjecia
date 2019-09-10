import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Photo } from '../../models/photo.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class PhotosDataService
{
    constructor(private storage: AngularFireStorage) { }

    async uploadPhoto(imageString: string, lat: number, lng: number, location: string = null) : Promise<Photo>
    {
        const randomId = Math.random().toString(36).substring(2);
        const ref = this.storage.ref(randomId);

        const blob = this.convertBase64ToFile(imageString);
        return new Promise(resolve => {
            ref.put(blob)
                .then(result => ref.getDownloadURL().toPromise())
                .then(url => {
                    const photo = new Photo();
                    photo.lat = lat;
                    photo.lng = lng;
                    photo.location = location;
                    photo.photo = url;

                    resolve(photo);
                })

        })
    }

    private convertBase64ToFile (image) : Blob
    {
        const byteString = atob(image.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
        }
        const newBlob = new Blob([ab], {
            type: 'image/png',
        });
        return newBlob;
    }
}
