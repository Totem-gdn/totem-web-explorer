import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['../basic-info.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class ContactFormComponent {
    get emailErrors() {
        const email = this.contactForm.get('email');
        return email?.errors && (email?.touched || email?.dirty);
    }

    contactForm = new FormGroup({
        email: new FormControl(null, Validators.required),
        discord: new FormControl(null)
    })
}