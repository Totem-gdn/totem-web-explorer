import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ChangeBannerService } from "@app/core/services/utils/banner-changer.service";
import { take } from "rxjs";

@Component({
    selector: 'totem-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss']
})

export class FileInputComponent implements OnInit {

    imageReader: FileReader = new FileReader();
    imageUrl: string = '';

    @Input() inputFile: string = '';
    @Output() fileSelected = new EventEmitter<string>();

    constructor(private changeBannerService: ChangeBannerService) {}

    ngOnInit(): void {}

    getFile(event: any) {
      const fileToValidate: File = event.target.files[0];
      if (this.isImage(fileToValidate)) {
        if (fileToValidate.size > 20971520) {
          return;
        }
        this.openCropper(event);;
      }
    }

    openCropper(event: any) {
      this.changeBannerService.changeImage(event, 'banner').pipe(take(1)).subscribe((file: File) => {
        this.imageReader.readAsDataURL(file);
        this.imageReader.onload = (event: any) => {
          this.imageUrl = event.target.result;
          this.fileSelected.emit(this.imageUrl);
        };
      })
    }

    isImage(event: any): boolean {
      return event?.type.includes('image/') ? true : false;
    }

    onChangeInput(target?: any) {
      this.fileSelected.emit(target?.value || '');
    }
}
