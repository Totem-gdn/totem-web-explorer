import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TotemCropperComponent } from "@app/modules/specific/add-your-game/modules/totem-cropper/totem-cropper.component";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class ChangeBannerService {
    constructor(readonly matDialog: MatDialog) {}

    openCropper(image: any, type: string): Observable<any> {
      const dialogType: string = type == 'banner' ? 'large-dialog' : 'small-dialog';
      const aspectRation: number = 7/1;
      const widthToResize: number = 1400;
      const options: MatDialogConfig = {
          disableClose: false,
          panelClass: dialogType,
          data: {
            file: image.file,
            imageBase64: image.imageBase64,
            aspectRatio: aspectRation,
            widthToResize: widthToResize
          },
          autoFocus: false
      };
      return this.matDialog.open(TotemCropperComponent, options).afterClosed();
    }

    changeImage(image: any, type: string) {
      return this.openCropper(image, type);
    }

}
