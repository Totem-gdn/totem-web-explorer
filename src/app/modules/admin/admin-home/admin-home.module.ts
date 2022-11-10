import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { CardsModule } from "@app/components/common/cards/cards.module";
import { GameCardModule } from "@app/components/common/cards/game-card/game-card.module";
import { CarouselModule } from "@app/components/common/carousel/carousel.module";
import { ArrowsModule } from "@app/components/utils/arrows/arrows.module";
import { BackgroundCircleModule } from "@app/components/utils/bg-circle/bg-circle.module";
import { TotemButtonModule } from "@app/components/utils/totem-button/totem-button.module";
import { HomeWidgetModule } from "@app/modules/landing/totem-home-page/components/home-components/home-widget/home-widget.module";
import { TotemEmailSubModule } from "@app/modules/landing/totem-home-page/components/home-components/totem-email-sub/totem-email-sub.module";
import { TotemEventCounterModule } from "@app/modules/landing/totem-home-page/components/home-components/totem-event-counter/totem-event-counter.module";
import { TotemMeetUsModule } from "@app/modules/landing/totem-home-page/components/home-components/totem-meet-us/totem-meet-us.module";
import { TotemPromoGameModule } from "@app/modules/landing/totem-home-page/components/home-components/totem-promo-game/totem-promo-game.module";
import { TotemHomePageRouting } from "@app/modules/landing/totem-home-page/totem-home-page-routing.module";
import { TotemHomePageModule } from "@app/modules/landing/totem-home-page/totem-home-page.module";
import { SharedModule } from "@app/shared/shared.module";
import { NgParticlesModule } from "ng-particles";
import { SwiperModule } from "swiper/angular";
import { AdminHomeComponent } from "./admin-home.component";
import { AdminHomeRoutes } from "./admin-home.routing";


@NgModule({
    declarations: [
        AdminHomeComponent
    ],
    imports: [
        TotemHomePageRouting,
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,
        SwiperModule,
        RouterModule,
    
        TotemPromoGameModule,
        TotemMeetUsModule,
        TotemEmailSubModule,
        TotemEventCounterModule,
    
        SharedModule,
        ArrowsModule,
        GameCardModule,
        CarouselModule,
        HomeWidgetModule,
        CardsModule,
    
        BackgroundCircleModule,
        TotemButtonModule,
    
        NgParticlesModule
    ],
    exports: [
        AdminHomeComponent
    ]
})

export class AdminHomeModule {

}