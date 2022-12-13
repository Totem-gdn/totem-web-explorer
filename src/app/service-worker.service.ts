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
    console.log('ver. list. initiated');
    this.swUpdate.versionUpdates.subscribe((event) => {
        console.log('SW EVENT FOUND', event);
        switch (event.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${event.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${event.currentVersion.hash}`);
            console.log(`New app version ready for use: ${event.latestVersion.hash}`);
            this.versionDialogService.openVersionDialog().subscribe((data: boolean) => {
              console.log(data);
              if (data == true) {
                this.swUpdate.activateUpdate().then(() => {
                  document.location.reload();
                });
              }
            });
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${event.version.hash}': ${event.error}`);
            break;
        }
    });
  }
}
