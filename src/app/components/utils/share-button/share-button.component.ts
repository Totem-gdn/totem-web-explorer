import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface Share {
  title?: string;
  text?: string;
  url?: string;
}

// interface ExtendNavigator extends Navigator {
//   share: (share: Share) => Promise<void>;
// }

// interface ExtendWindow extends Window {
//   navigator: ExtendNavigator;
// }

// declare var window: ExtendWindow;

@Component({
  selector: 'share-button',
  templateUrl: './share-button.component.html',
//   styleUrls: ['./share-button.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareButtonComponent {
//   @Input() set share(share: Share) {
//     window.navigator.share(share);
//   }

    share(description: string, url: string) {
        // const navigator = window.navigator as any;

        // console.log('clicked')
        // const info: Share = {
        //     url: 'https://google.com',
        //     title: 'Totem Explorer',
        //     text: description
        // }
        // window.navigator['share'](info);
        // const test = window.navigator;
        // navigator.
        // navigator.canShare();
        const res = navigator.canShare();
        console.log('can share ', res)
        navigator.share({
            title: 'title',
            text: 'description',
            url: 'https://soch.in//',
          })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    }

}