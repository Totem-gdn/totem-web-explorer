import { Injectable } from "@angular/core";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { DNAField } from "@app/core/models/interfaces/dna-field.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
// const { itemFilterJson} = require('totem-common-files');
const DNAFilter = require('totem-common-files');
const { DNAParser, ContractHandler } = require('totem-dna-parser');
// import * as DNAFilter from 'totem-common-files';

enum DNA_FILTER {
    CANONIC = 'canonic'
}
@Injectable({ providedIn: 'root' })

export class DNAParserService {

    // handleDNAField(id: string, value: string) {

    //     // if (id == 'primary_color') {
    //     //     return this.rgba2hex(value);
    //     // }
    //     // if (id == 'sex_bio') {
    //     //     if (value == '0') return 'Male';
    //     //     if (value == '1') return 'Female';
    //     // }
    //     // if (id == 'body_strength') {
    //     //     if (value == '0') return 'Wimp';
    //     //     if (value == '1') return 'Muscular';
    //     // }
    //     // if (id == 'body_type') {
    //     //     if (value == '0') return 'Thin';
    //     //     if (value == '1') return 'Fat';
    //     // }

    //     return value;
    // }

    rgba2hex(str: any) {
        if (str.match(/^#[a-f0-9]{6}$/i)) return;
        const rgb = str.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }


    // getJSON(gameName: string | undefined, type: string): DNAField[] {
    //     if(gameName == 'Dreadstone Keep' && type == 'avatar') return DNAFilter.totemAvatarDreadstoneKeepFilterJson;
    //     if(gameName == 'Dreadstone Keep' && type != 'avatar') return DNAFilter.totemItemDreadstoneKeepFilterJson;

    //     if(gameName == 'Monk vs Robots' && type == 'avatar') return DNAFilter.monkVsRobotsAvatarFilterJson;
    //     if(gameName == 'Monk vs Robots' && type != 'avatar') return DNAFilter.monkVsRobotsItemFilterJson;


    //     // console.log(DNAFilter)
    //     //Default filters
    //     if(!gameName || type != 'avatar') return DNAFilter.itemFilterJson;
    //     else return DNAFilter.avatarFilterJson;
    // }

    async getJSONByGame(game: GameDetail | null, type: ASSET_TYPE) {
        let json: any = '';

        if (!game?.connections?.dnaFilters) {
            if (type == ASSET_TYPE.AVATAR) {
                json = game?.connections?.dnaFilters?.avatarFilter;
            } else if (type == ASSET_TYPE.ITEM) {
                json = game?.connections?.dnaFilters?.assetFilter;
            } else if (type == ASSET_TYPE.GEM) {
                json = game?.connections?.dnaFilters?.gemFilter;
            }
        }
        if (!json) {
            if (type == ASSET_TYPE.AVATAR) {
                json = DNAFilter.avatarFilterJson;
            } else {
                json = DNAFilter.itemFilterJson;
            }
        }
        return json;
    }

    async processJSON(json: any[], type: ASSET_TYPE, id: number | null = null) {
        const url = 'https://matic-mumbai.chainstacklabs.com'
        let contract = ''
        if (type == ASSET_TYPE.ITEM) {
            contract = '0xfC5654489b23379ebE98BaF37ae7017130B45086'
        } else if (type == ASSET_TYPE.GEM) {
            contract = '0x0e2a085063e15FEce084801C6806F3aE7eaDfBf5'
        } else if (type == ASSET_TYPE.AVATAR) {
            contract = '0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35'
        }
        const contractHandler = new ContractHandler(url, contract);

        let DNA = ''
        if(id) DNA = await contractHandler.getDNA(id);

        const parser = new DNAParser(json, DNA);

        json.map((prop) => {
            let value = parser.getField(prop.id);
            if (prop.type == 'Color') {
                value = this.rgba2hex(value);
            }
            prop.value = value;
        })

        return json;
    }

}
