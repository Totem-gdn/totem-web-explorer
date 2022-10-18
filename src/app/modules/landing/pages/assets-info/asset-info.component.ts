import { AfterViewChecked, Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlchemyService } from "@app/core/services/crypto/alchemy-api.service";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { DNAParserService } from "@app/core/services/dna-parser.service";
const { DNAParser, ContractHandler } = require('totem-dna-parser');
// import * as DNA from 'dna-parser'


@Component({
    selector: 'asset-info',
    templateUrl: './asset-info.component.html',
    styleUrls: ['./asset-info.component.scss'],
    host: {
        class: 'relative'
    }
})

export class AssetInfoComponent {

    constructor(private route: ActivatedRoute,
        private itemsService: TotemItemsService,
        private alchService: AlchemyService,
        private web3: Web3AuthService,
        private dnaService: DNAParserService) { }

    activeTab = 'properties';
    subs = new Subject<void>();

    @Input() type!: string;
    @Input() set item(item: any) {
        this._item = item;
        if (!item) return;
        this.processItem(item?.tokenId)
    }

    _item!: any;
    assets!: any[];

    properties!: any[];
    transactionHistory!: string;


    onChangeTab(tab: string) {
        this.activeTab = tab;
    }

    ngOnInit() {
        this.sliderItems();

        if (this.type == 'item' || 'gem') this.properties = [{ title: 'Type', id: 'classical_element', value: '--', tooltip: false }, { title: 'Damage', id: 'damage_nd', value: '--', tooltip: false }, { title: 'Range', id: 'range_nd', value: '--', tooltip: false }, { title: 'Power', id: 'power_nd', value: '--', tooltip: false }, { title: 'Magical Power', id: 'magical_exp', value: '--', tooltip: false }, { title: 'Weapon Material', id: 'weapon_material', value: '--', tooltip: false }, { title: 'Primary Color', id: 'primary_color', value: '--', tooltip: false, showColor: true },]
        // if (this.type == 'gem') this.properties = [{ title: 'Type', value: '--', tooltip: false }, { title: 'Damage', value: '--', tooltip: false }, { title: 'Range', value: '--', tooltip: false }, { title: 'Power', value: '--', tooltip: false }, { title: 'Magical Power', value: '--', tooltip: false }, { title: 'Weapon Material', value: '--', tooltip: false }, { title: 'Primary Color', value: '--', tooltip: false },]
        if (this.type == 'avatar') this.properties = [{ title: 'Sex', id: 'sex_bio', value: '--', tooltip: false }, { title: 'Body Strength', id: 'body_strength', value: '--', tooltip: false }, { title: 'Body Type', id: 'body_type', value: '--', tooltip: false }, { title: 'Skin Color', id: 'human_skin_color', value: '--', tooltip: false, showColor: true }, { title: 'Hair Color', id: 'human_hair_color', value: '--', tooltip: false, showColor: true }, { title: 'Eye Color', id: 'human_eye_color', value: '--', tooltip: false, showColor: true }, { title: 'Hair Style', id: 'hair_styles', value: '--', tooltip: false }, { title: 'Weapon Type', id: 'weapon_type', value: '--', tooltip: false }, { title: 'Weapon Material', id: 'weapon_material', value: '--', tooltip: false }, { title: 'Primary Color', id: 'primary_color', value: '--', tooltip: false, showColor: true },]
    }


    sliderItems() {
        if (this.type == 'avatar') {
            this.itemsService.getAvatars$().pipe(takeUntil(this.subs))
                .subscribe(assets => {
                    this.assets = assets;
                })
        }
        if (this.type == 'gem') {
            this.itemsService.getGems$().pipe(takeUntil(this.subs))
                .subscribe(assets => {
                    this.assets = assets;
                })
        }
        if (this.type == 'item') {
            this.itemsService.getItems$().pipe(takeUntil(this.subs))
                .subscribe(assets => {
                    this.assets = assets;
                })
        }
    }

    async processItem(id: number) {
        const url = 'https://matic-mumbai.chainstacklabs.com'
        let contract = ''
        let json = ''
        if (this.type === 'item') {
            contract = '0xfC5654489b23379ebE98BaF37ae7017130B45086'
            json = DNAParser.defaultItemJson
        } else if (this.type === 'gem') {
            contract = '0x0e2a085063e15FEce084801C6806F3aE7eaDfBf5'
            json = DNAParser.defaultGemJson
        } else if (this.type === 'avatar') {
            contract = '0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35'
            json = DNAParser.defaultAvatarJson
        }
        const contractHandler = new ContractHandler(url, contract)

        const DNA = await contractHandler.getDNA(id)

        const parser = new DNAParser(json, DNA)

        this._item.rarity = parser.getItemRarity(id)

        this.properties.map((prop) => {
            // prop.value = parser.getField(prop.id)
            const value = parser.getField(prop.id);
            prop.value = this.dnaService.handleDNAField(prop.id, value);
        })
    }

    handleProperties(title: string, value: string) {
        
    }

    ngOnDestroy() {
        this.subs.next();
        this.subs.complete();
    }
}
