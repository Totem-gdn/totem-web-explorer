import { trigger, state, style, transition, animate, group } from '@angular/animations';

export const Animations = {
    animations: [
        trigger(
          'showMessage', 
          [
            transition(
              ':enter', 
              [
                style({ height: 0, opacity: 0 }),
                group([
                    animate('0.4s ease-in-out', 
                        style({ height: 36})),
                    animate('0.3s 0.1s ease-in-out',
                        style({opacity: 1}))
                ])
              ]
            ),
            transition(
              ':leave', 
              [
                style({ height: 36, opacity: 1 }),
                group([
                    animate('0.3s 0.1s ease-in-out', 
                        style({ height: 0})),
                    animate('0.3s ease-in-out',
                        style({opacity: 0}))
                ])
              ]
            )
          ]
        ),
        trigger(
            'showInput', 
            [
              transition(
                ':enter', 
                [
                  style({ height: 0, opacity: 0 }),
                  animate('0.4s ease-in-out', 
                          style({ height: 40, opacity: 1 }))
                ]
              ),
              transition(
                ':leave', 
                [
                  style({ height: 40, opacity: 1 }),
                  animate('0.4s ease-in-out', 
                          style({ height: 0, opacity: 0 }))
                ]
              )
            ]
          ),
          trigger(
            'tagAnimation', 
            [
              transition(
                ':enter', 
                [
                  style({ opacity: 0 }),
                  animate('0.4s ease-in-out', 
                          style({ opacity: 1 }))
                ]
              ),
              transition(
                ':leave', 
                [
                  style({ opacity: 1 }),
                  animate('0.4s ease-in-out', 
                          style({ opacity: 0 }))
                ]
              )
            ]
          )
      ]

}