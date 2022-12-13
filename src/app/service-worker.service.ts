import { Injectable } from "@angular/core";
import { SwUpdate } from '@angular/service-worker';
import { VersionDialogService } from "./core/dialogs/version-dialog/services/version-dialog.service";

@Injectable({providedIn: 'root'})

export class ServiceWorkerService {

  constructor(
    private swUpdate: SwUpdate,
    private versionDialogService: VersionDialogService,
    ) {}

  //Here you can check the versions
  listenNewVersion() {
    this.swUpdate.versionUpdates.subscribe((event) => {
        switch (event.type) {
          case 'VERSION_DETECTED':
            break;
          case 'VERSION_READY':
            this.versionDialogService.openVersionDialog().subscribe((data: boolean) => {
              if (data == true) {
                this.swUpdate.activateUpdate().then(() => {
                  document.location.reload();
                });
              }
            });
            break;
          case 'VERSION_INSTALLATION_FAILED':
            // console.log(`Failed to install app version '${event.version.hash}': ${event.error}`);
            break;
        }
    });
  }
}
