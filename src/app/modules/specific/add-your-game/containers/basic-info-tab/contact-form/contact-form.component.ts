
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";
import { FormsService } from "@app/modules/specific/add-your-game/services/forms.service";

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['../../form-styles.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class ContactFormComponent implements OnInit, AfterViewInit {

    @Output() formValid = new EventEmitter<any>();
    @Input() editMode: boolean = false;

    contactForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        discord: new FormControl(null)
    })

    constructor (private formsService: FormsService) {}

    ngOnInit(): void {
      if (this.editMode) {
        this.contactForm = new FormGroup({
          email: new FormControl(null, [Validators.email]),
          discord: new FormControl(null)
        })
        this.isFormValid();
      }
    }

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

    isFormValid() {
        this.formValid.emit({formName: 'contacts', value: this.contactForm.valid})
    }

    saveValue() {
        const value = this.contactForm.value;
        this.formsService.saveForm('contacts', value);
        this.isFormValid();
    }

    retrieveValues() {
        const values =  this.formsService.getForm('contacts');
        if(!values) return;
        this.contactForm.patchValue({
            email: values.email,
            discord: values.discord
        });
        this.isFormValid();
    }
}
