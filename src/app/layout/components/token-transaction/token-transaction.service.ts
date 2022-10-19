import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class TokenTransactionService {

    showPopup = new BehaviorSubject<boolean>(false);

}