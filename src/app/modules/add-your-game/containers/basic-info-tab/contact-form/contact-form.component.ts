import { AfterViewInit, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";
import { FormsService } from "@app/modules/add-your-game/forms.service";

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['../../form-styles.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class ContactFormComponent implements AfterViewInit {

    constructor (private formsService: FormsService) {}

    ngAfterViewInit(): void {
        this.retrieveValues();
    }

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

    saveValue() {
        const value = this.contactForm.value;
        this.formsService.saveForm('contacts', value);
    }

    retrieveValues() {
        const values =  this.formsService.getForm('contacts');
        console.log(values)
        if(!values) return;
        console.log(values)
        this.contactForm.patchValue({
            email: values.email,
            discord: values.discord
        });
    }
}