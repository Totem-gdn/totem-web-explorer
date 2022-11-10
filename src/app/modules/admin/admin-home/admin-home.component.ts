import { Component, OnInit } from "@angular/core";
import { TotemHomePageComponent } from "@app/modules/landing/totem-home-page/components/totem-home-page.component";
// import { TotemHomePageModule } from "@app/modules/landing/totem-home-page/totem-home-page.module";
@Component({
    selector: 'admin-home',
    templateUrl: '../../landing/totem-home-page/components/totem-home-page.component.html'
})

export class AdminHomeComponent extends TotemHomePageComponent implements OnInit {
    
    override ngOnInit() {

    }
}