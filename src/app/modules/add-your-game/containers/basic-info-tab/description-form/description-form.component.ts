import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Animations } from "@app/core/animations/animations";

@Component({
    selector: 'description-form',
    templateUrl: './description-form.component.html',
    styleUrls: ['../basic-info.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class DescriptionFormComponent {

    descriptionForm = new FormGroup({
        fullDescription: new FormControl(null)
    })
}