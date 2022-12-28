import { animate, state, style, transition, trigger } from "@angular/animations";


export const fadeInBotAnimation = trigger('fadeInBot',
[
    transition(':enter',
        [
            style({
                opacity  : 0,
                transform: 'translate3d(0, 50%, 0)'
            }),
            animate('0.7s cubic-bezier(0.0, 0.0, 0.2, 1)'),
            style({
                opacity: 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ]
    ),

    // state('*',
    //     style({
    //         opacity  : 1,
    //         transform: 'translate3d(0, 0, 0)'
    //     })
    // ),

    // Prevent the transition if the state is false
    // transition('void => false', []),

    // Transition
    // transition('void => *', animate('{{timings}}'),
    //     {
    //         params: {
    //             timings: '.3s cubic-bezier(0.0, 0.0, 0.2, 1)'
    //         }
    //     }
    // )
]
);
// export const fadeInBotAnimation = trigger('fadeInTop',
// [
//     transition(':enter',
//         [
//             style({
//                 opacity  : 0,
//                 transform: 'translate3d(0, 100%, 0)'
//             }),
//             animate('.3s cubic-bezier(0.0, 0.0, 0.2, 1)'),
//             style({
//                 opacity: 1,
//                 transform: 'translate3d(0, 0, 0)'
//             })
//         ]
//     ),

//     // state('*',
//     //     style({
//     //         opacity  : 1,
//     //         transform: 'translate3d(0, 0, 0)'
//     //     })
//     // ),

//     // Prevent the transition if the state is false
//     // transition('void => false', []),

//     // Transition
//     // transition('void => *', animate('{{timings}}'),
//     //     {
//     //         params: {
//     //             timings: '.3s cubic-bezier(0.0, 0.0, 0.2, 1)'
//     //         }
//     //     }
//     // )
// ]
// );