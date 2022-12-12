import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import { SnackNotifierService } from '../snack-bar-notifier/snack-bar-notifier.service';
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
    //   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareButtonComponent {

    constructor(private clipboard: Clipboard,
                private messageService: SnackNotifierService) {}

    share(description: string) {
        const url = window.location.href;

        const info: Share = {
            url: url,
            title: 'Totem Explorer',
            text: description
        }

        if (window.navigator.share) {
            window.navigator
                .share(
                    info
                );
        } else {
            this.clipboard.copy(url);
            this.messageService.open('Copied to clipboard');
        }
    };



}