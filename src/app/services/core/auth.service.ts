import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { UsersDataService } from '../data/users.data.service';
import { User } from '../../models/user.model';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    public user : Subject<User> = new Subject();
    public logged: User;
    constructor(private fireAuth: AngularFireAuth, private usersDataService: UsersDataService) {}

    register(data: Object) : Promise<any>
    {
        return this.fireAuth.auth
            .createUserWithEmailAndPassword(data["email"], data["password"])
            .then(result => {
                data["id"] = result.user.uid;
                return this.usersDataService.addUser(data);
            });
    }

    login(data: Object) : Observable<any>
    {
        return from(this.fireAuth.auth.signInWithEmailAndPassword(data["email"], data["password"]));
    }

    loadLoggedUser(id: string)
    {
        this.usersDataService.getUser(id).valueChanges().subscribe((user: User) => {
            this.logged = user;
            this.user.next(user)
        });
    }
}
