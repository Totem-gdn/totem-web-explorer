import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStateService } from '@app/core/services/user-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'totem-basic-info-tab',
  templateUrl: './basic-info-tab.component.html',
  styleUrls: ['./basic-info-tab.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class BasicInfoTabComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();

  constructor(private userStateService: UserStateService) {
  }

  infoForm = new FormGroup({
    generalDescription: new FormGroup({
      gameName: new FormControl(null, [Validators.required]),
      authorName: new FormControl(null,),
      previewDescription: new FormControl(null,),

    }),

  })

  onSubmit() {
    console.log(this.infoForm.value.generalDescription?.gameName);
  }
  ngOnInit() {
    /* this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    ) */
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
