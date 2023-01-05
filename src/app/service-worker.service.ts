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
            console.log('New ver. detected');
            break;
          case 'VERSION_READY':
            console.log('Current ver: ', event.currentVersion);
            console.log('New ver. ready to be installed: ', event.latestVersion);
            this.versionDialogService.openVersionDialog().subscribe((data: boolean) => {
              if (data == true) {
                this.swUpdate.activateUpdate().then(() => {
                  document.location.reload();
                });
              }
            });
            break;
          case 'VERSION_INSTALLATION_FAILED':
            break;
        }
    });
  }
}
