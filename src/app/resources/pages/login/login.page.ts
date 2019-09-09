import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/core/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: [ './login.page.scss' ],
})
export class LoginPage implements OnInit
{
    form: FormGroup;
    message: string = "";

    constructor(private authService: AuthService, private router: Router, private platform: Platform) { }

    ngOnInit()
    {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [ Validators.required, Validators.email ]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [ Validators.required ]
            })
        });
    }

    onSubmit(): void
    {
        if (!this.form.valid)
        {
            return;
        }

        this.authService.login(this.form.value)
            .subscribe(response =>
            {
                this.message = "";
                this.router.navigate(["/logged","home"])
            }, (error =>
            {
                this.message = error.message
            }));
    }
}
