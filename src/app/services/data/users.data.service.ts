import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Photo } from '../../models/photo.model';

@Injectable({
    providedIn: 'root'
})
export class UsersDataService
{
    constructor(private fireDatabase: AngularFireDatabase) { }

    addUser(data: Object) : Promise<any>
    {
        const ref = this.fireDatabase.object(`/users/${data["id"]}`);
        return ref.set({
            id: data["id"],
            email: data["email"],
            first_name: data["first_name"],
            last_name: data["last_name"]
        });
    }

    getUser(id: string)
    {
        return this.fireDatabase.object(`/users/${id}`);
    }

    addPhoto(id: string, photo: Photo)
    {
        const ref = this.fireDatabase.list(`/users/${id}/photos`);
        ref.push(photo);
    }
}
