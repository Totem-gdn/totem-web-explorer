import { Injectable } from "@angular/core";
import { SwUpdate, VersionEvent } from '@angular/service-worker';

@Injectable({providedIn: 'root'})

export class ServiceWorkerService {

  constructor(private swUpdate: SwUpdate) {}

  //Here you can check the versions
  listenNewVersion() {
    console.log('ver. list. initiated');
    this.swUpdate.versionUpdates.subscribe((event) => {
        console.log('SW EVENT FOUND', event);

        switch (event.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${event.version.hash}`);
            if (confirm('Software update avaialble.')) {
              this.swUpdate.activateUpdate().then(() => {
                document.location.reload();
              });
            }
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${event.currentVersion.hash}`);
            console.log(`New app version ready for use: ${event.latestVersion.hash}`);
            if (confirm('Software update avaialble.')) {
              this.swUpdate.activateUpdate().then(() => {
                document.location.reload();
              });
            }
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${event.version.hash}': ${event.error}`);
            break;
        }
    });
  }
}
