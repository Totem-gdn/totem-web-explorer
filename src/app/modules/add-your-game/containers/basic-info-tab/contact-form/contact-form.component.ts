
import { AfterViewInit, Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";
import { FormsService } from "@app/modules/add-your-game/forms.service";
import { SubmitGameService } from "@app/modules/add-your-game/services/submit-game.service";

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['../../form-styles.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class ContactFormComponent implements AfterViewInit {

    constructor (private submitService: SubmitGameService) {}

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

    @Output() formValid = new EventEmitter<any>();

    contactForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        discord: new FormControl(null)
    })

    isFormValid() {
        this.formValid.emit({formName: 'contacts', value: this.contactForm.valid})
    }

    saveValue() {
        const value = this.contactForm.value;
        this.submitService.saveForm('contacts', value);
        this.isFormValid();
    }

    retrieveValues() {
        const values =  this.submitService.getForm('contacts');
        if(!values) return;
        this.contactForm.patchValue({
            email: values.email,
            discord: values.discord
        });
        this.isFormValid();
    }
}
