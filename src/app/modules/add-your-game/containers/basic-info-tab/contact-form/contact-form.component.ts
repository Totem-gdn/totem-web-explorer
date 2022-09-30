import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";
import { ContactsInfo, SubmitGame } from "@app/core/models/submit-game-interface.model";
import { Observable, Subscription } from "rxjs";

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['../../form-styles.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class ContactFormComponent implements OnDestroy {

    @Output() contactFormDataEvent: EventEmitter<SubmitGame> = new EventEmitter();
    constructor() {
    }

    emitFormData() {
      const formData: any = this.contactForm.value;
      this.contactFormDataEvent.emit({contacts: {email: formData?.email, discord: formData?.discord}});
    }

    ngOnDestroy(): void {
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
        email: new FormControl('', [Validators.required, Validators.email]),
        discord: new FormControl('')
    })
}
