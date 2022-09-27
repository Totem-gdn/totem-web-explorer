import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['../../form-styles.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class ContactFormComponent {

    emailErrors(error: string) { 
        const email = this.contactForm.get('email');
        if(error === 'required') {
            return email?.errors?.['required'] && (email?.touched || email?.dirty);
        }
        if(error == 'email') {
            return email?.errors?.['email'] && (email?.touched || email?.dirty);
        }
        return email?.errors && (email?.touched || email?.dirty);
    };

    contactForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        discord: new FormControl(null)
    })
}