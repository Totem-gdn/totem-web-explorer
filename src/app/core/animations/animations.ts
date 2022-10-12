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
                  style({ opacity: 0, height: 0 }),
                  animate('0.4s ease-in-out',
                          style({ opacity: 1, height: 40 }))
                ]
              ),
              transition(
                ':leave',
                [
                  style({ opacity: 1, height: 40 }),
                  animate('0.4s ease-in-out',
                          style({ opacity: 0, height: 40 }))
                ]
              )
            ]
          ),
          trigger(
            'hashAnimation',
            [
              transition(
                ':enter',
                [
                  style({ opacity: 0, height: 0 }),
                  animate('0.4s ease-in-out',
                          style({ opacity: 1, height: 128 }))
                ]
              ),
              transition(
                ':leave',
                [
                  style({ opacity: 1, height: 128 }),
                  animate('0.4s ease-in-out',
                          style({ opacity: 0, height: 128 }))
                ]
              )
            ]
          ),
          trigger(
            'fileAnimation',
            [
              transition(
                ':enter',
                [
                  style({ opacity: 0, height: 0 }),
                  animate('0.4s ease-in-out',
                          style({ opacity: 1, height: 50 }))
                ]
              ),
              transition(
                ':leave',
                [
                  style({ opacity: 1, height: 50 }),
                  animate('0.4s ease-in-out',
                          style({ opacity: 0, height: 0 }))
                ]
              )
            ]
          ),
          trigger(
            'fade-in-out',
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
          ),
          trigger(
            'fade-in',
            [
              transition(
                ':enter',
                [
                  style({ opacity: 0 }),
                  animate('0.4s ease-in-out',
                          style({ opacity: 1 }))
                ]
              ),
            ]
          ),
          trigger (
            'stopLoader',
            [
              transition(
                ':enter',
                [
                  style({ opacity: 0 }),
                  animate('0.33s ease-out',
                          style({opacity: 1}))
                ]
              ),
              transition(
                ':leave',
                [
                  style({ opacity: 1 }),
                  animate('0.33s ease-in',
                          style({opacity: 0}))
                ]
              )
            ]
          )
      ]

}
