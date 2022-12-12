import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface Share {
  title?: string;
  text?: string;
  url?: string;
}

interface ExtendNavigator extends Navigator {
  share: (share: Share) => Promise<void>;
}

interface ExtendWindow extends Window {
  navigator: ExtendNavigator;
}

declare var window: ExtendWindow;

@Component({
  selector: 'share-button',
  templateUrl: './share-button.component.html',
//   styleUrls: ['./share-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareButtonComponent {
//   @Input() set share(share: Share) {
//     window.navigator.share(share);
//   }

    share(description: string, url: string) {
        console.log('clicked')
        const info: Share = {
            url: 'https://test',
            title: 'Totem Explorer',
            text: description
        }
        window.navigator.share(info);
    }

}