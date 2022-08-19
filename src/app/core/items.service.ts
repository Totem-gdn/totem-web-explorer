import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})

export class ItemsService {

    items: any = [
        {
          name: 'Mr.Krabs kills',
          type: 'Horror',
          img: 'assets/images/promo-game.png'
        },
        {
          name: 'GTA 6',
          type: 'Arcade',
          img: 'assets/images/promo-game.png'
        },
        {
          name: 'Conta City',
          type: 'Shooter',
          img: 'assets/images/promo-game.png'
        },
        {
          name: 'Mineground',
          type: 'Sandbox',
          img: 'assets/images/promo-game.png'
        },
        {
          name: 'Crysis 5',
          type: 'Shooter',
          img: 'assets/images/promo-game.png'
        },
        {
          name: 'Stalker: killzone',
          type: 'Action',
          img: 'assets/images/promo-game.png'
        },
        {
          name: 'Survival Zone Craft',
          type: 'Survival',
          img: 'assets/images/promo-game.png'
        },
      ]
}