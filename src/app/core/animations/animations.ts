import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
    animations: [
        trigger(
          'showMessage', 
          [
            transition(
              ':enter', 
              [
                style({ height: 0, opacity: 0 }),
                animate('0.4s ease-in-out', 
                        style({ height: 36, opacity: 1 }))
              ]
            ),
            transition(
              ':leave', 
              [
                style({ height: 36, opacity: 1 }),
                animate('0.4s ease-in-out', 
                        style({ height: 0, opacity: 0 }))
              ]
            )
          ]
        )
      ]

}