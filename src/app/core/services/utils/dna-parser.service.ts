import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { AssetsABI } from "@app/core/web3auth/abi/assetsABI";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { catchError, firstValueFrom, throwError } from "rxjs";
import Web3 from "web3";
// const { itemFilterJson} = require('totem-common-files');
const DNAFilter = require('totem-common-files');
const { DNAParser, ContractHandler } = require('totem-dna-parser');
// import * as DNAFilter from 'totem-common-files';

enum DNA_FILTER {
    CANONIC = 'canonic'
}
@Injectable({ providedIn: 'root' })

export class DNAParserService {

    constructor(private http: HttpClient,
                private web3: Web3AuthService) { }

    rgba2hex(str: any) {
        if (str.match(/^#[a-f0-9]{6}$/i)) return;
        const rgb = str.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }


    async getJSONByGame(game: GameDetail | null, type: ASSET_TYPE) {
        let json: any = '';
        let jsonUrl: string | undefined = '';

        if (game?.connections?.dnaFilters) {
            if (type == ASSET_TYPE.AVATAR) {
                jsonUrl = game?.connections?.dnaFilters?.avatarFilter;
            } else if (type == ASSET_TYPE.ITEM) {
                jsonUrl = game?.connections?.dnaFilters?.assetFilter;
            } else if (type == ASSET_TYPE.GEM) {
                jsonUrl = game?.connections?.dnaFilters?.gemFilter;
            }
        }

        if (!jsonUrl) {
            if (type == ASSET_TYPE.AVATAR) {
                json = DNAFilter.avatarFilterJson;
                return json;
            } else {
                json = DNAFilter.itemFilterJson;
                return json;
            }
        }
        
        

        console.log('json reques')
        json = await firstValueFrom(this.http.get<any>(jsonUrl))

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

        // const web3 = new Web3(this.web3.provider as any);
        // const con = new web3.eth.Contract(AssetsABI, contract);
        // console.log('contract', con)
        let DNA = ''
        if (id) DNA = await contractHandler.getDNA(id);

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
