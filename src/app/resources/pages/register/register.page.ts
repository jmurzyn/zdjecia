import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/core/auth.service';
import { Router } from '@angular/router';
import { handleValidationErrorMessage, validateControls } from '../../../utilities/form.utils';
import { equalToFieldValue } from '../../../utilities/validators';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: [ './register.page.scss' ],
})
export class RegisterPage implements OnInit
{
    form: FormGroup;
    formUtils = { handleValidationErrorMessage, validateControls };

    messages = [
        {
            field: 'email',
            errors: [
                {
                    error: 'required',
                    message: 'Email jest wymagany'
                },
                {
                    error: 'email',
                    message: 'To nie jest poprawny adres email'
                }
            ]
        },
        {
            field: 'password',
            errors: [
                {
                    error: 'required',
                    message: 'Hasło jest wymagane'
                },
                {
                    error: 'minlength',
                    message: 'Hasło musi mieć przynajmniej 8 znaków'
                },
                {
                    error: 'equalToFieldValue',
                    message: 'Hasła nie zgadzają się'
                },
            ]
        },
        {
            field: 'password_repeat',
            errors: [
                {
                    error: 'required',
                    message: 'Powtórzone hasło jest wymagane'
                },
                {
                    error: 'equalToFieldValue',
                    message: 'Hasła nie zgadzają się'
                },
            ]
        },
        {
            field: 'first_name',
            errors: [
                {
                    error: 'required',
                    message: 'Imię jest wymagane'
                }
            ]
        },
        {
            field: 'last_name',
            errors: [
                {
                    error: 'required',
                    message: 'Nazwisko jest wymagane'
                }
            ]
        },
    ];

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit()
    {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [ Validators.required, Validators.email ]
            }),
            password: new FormControl(null,{
                updateOn: 'blur',
                validators: [ Validators.required, Validators.minLength(8) ]
            }),
            password_repeat: new FormControl(null,{
                updateOn: 'blur',
                validators: [ Validators.required ]
            }),
            first_name: new FormControl(null, {
                updateOn: 'blur',
                validators: [ Validators.required, Validators.min(1) ]
            }),
            last_name: new FormControl(null, {
                updateOn: 'blur',
                validators: [ Validators.required, Validators.min(1) ]
            }),
        })

        // password
        this.form.get('password')
            .valueChanges
            .subscribe(
                () => {
                    const control = this.form.get('password_repeat');
                    control.setValidators([Validators.required, equalToFieldValue(this.form.get('password').value)]);
                    control.updateValueAndValidity();
                });
    }

    onSubmit() : void
    {
        if(!this.form.valid)
            return;

       this.authService.register(this.form.value)
           .then(response => {
              console.log(response)
               this.router.navigate(["/logged","photos"])
           })
           .catch(error => {
               console.log(error)
           });
    }
}
