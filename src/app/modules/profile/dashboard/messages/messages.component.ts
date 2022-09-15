import { Component, OnInit } from '@angular/core';
import { PaginationEvent } from '@app/core/models/page-event-interface.model';
import { BehaviorSubject } from 'rxjs';

const messages: any[] = [
  {id: 1, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 2, isOpened: false, type: 'account', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 3, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 4, isOpened: false, type: 'update', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 5, isOpened: false, type: 'settings', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 6, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 7, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 8, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 9, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 10, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 11, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 12, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 13, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 14, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 15, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 16, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 17, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 18, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 19, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 20, isOpened: false, type: 'notification', title: 'Update 0.12.45 C', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 21, isOpened: false, type: 'notification', title: 'Update 0.12.3 nextPAGE', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 22, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
  {id: 23, isOpened: false, type: 'notification', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false},
]

@Component({
  selector: 'totem-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  allChecked: boolean = false;
  total: number = 0;
  messageList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  messageType: any = {
    ACCOUNT: 'account',
    NOTIF: 'notification',
    SETTINGS: 'settings',
    UPDATE: 'update'
  }

  get master() {
    return this.messageList.getValue().every(c => c.isChecked);
  }
  set master(v) {
    this.messageList.getValue().map(c => c.isChecked = v);
    //this.messageList.getValue().map(c => console.log(c.isChecked));
  }

  constructor() { }

  ngOnInit(): void {
    this.total = messages.length;
    let arrayToList = messages.slice(0, 20);
    this.messageList.next(arrayToList);
  }

  pageEvent(pagination: PaginationEvent) {
    console.log(pagination);
    let arrayToList = messages.slice(pagination.currentPage * pagination.size, (pagination.currentPage * pagination.size) + pagination.size);
    this.messageList.next(arrayToList);
  }

  add() {
    this.messageList.getValue().push({id: 5, type: 'settings', title: 'Update 0.12.3 b', text: 'Notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa pretium, volutpat eget pellentesque. Vivamus enim sed at nunc aliquet rhoncus felis. Pulvinar ornare eget non fames. In cursus fermentum diam viverra sollicitudin viverra adipiscing. In nunc sagittis sapien lectus fermentum, feugiat eget pellentesque faucibus. Neque, fringilla amet cras platea egestas posuere. Nulla ipsum molestie arcu amet consequat id et. Ut ornare tortor, eget volutpat donec. Sed sit nulla nisi, non quis.', date: 'Aug 30, 2022, 11:35 AM', isChecked: false, isReaded: false})
  }

  restore() {
    this.messageList.next([]);
  }

  checkMessage(id: any) {
    let index = this.messageList.getValue().findIndex((message) => message.id === id);
    this.messageList.getValue()[index].isChecked = !this.messageList.getValue()[index].isChecked;
    console.log(this.messageList.getValue()[index].isChecked);
  }

  openMessage(id: any) {
    let index = this.messageList.getValue().findIndex((message) => message.id === id);
    this.messageList.getValue()[index].isOpened = !this.messageList.getValue()[index].isOpened;
    console.log(this.messageList.getValue()[index].isOpened);
  }

  getIsOpened(id: any): boolean {
    console.log(id);

    let index = this.messageList.getValue().findIndex((message) => message.id === id);
    this.messageList.getValue()[index].isReaded = true;

    return this.messageList.getValue()[index].isOpened;
  }

  atLeastOneChecked(): boolean {
    return this.messageList.getValue().some((message: any) => message.isChecked === true);
  }

  markAsReaded() {
    this.messageList.getValue().map((message: any) => {
      if (message.isChecked) {
        message.isReaded = true;
        message.isChecked = false;
      }
      return message;
    })
  }

}
