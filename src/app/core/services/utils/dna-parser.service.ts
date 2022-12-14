import { Injectable } from "@angular/core";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { DNAField } from "@app/core/models/interfaces/dna-field.model";
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
        if(str.match(/^#[a-f0-9]{6}$/i)) return;
        const rgb = str.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }

    // processProperties(gameName: string | undefined, asset: AssetInfo, properties: any[])
    // {
    //     let 
    //     if(gameName)
    // }

    getJSON(gameName: string | undefined, type: string): DNAField[] {
        if(gameName == 'Dreadstone Keep' && type == 'avatar') return DNAFilter.totemAvatarDreadstoneKeepFilterJson;
        if(gameName == 'Dreadstone Keep' && type != 'avatar') return DNAFilter.totemItemDreadstoneKeepFilterJson;

        if(gameName == 'Monk vs Robots' && type == 'avatar') return DNAFilter.monkVsRobotsAvatarFilterJson;
        if(gameName == 'Monk vs Robots' && type != 'avatar') return DNAFilter.monkVsRobotsItemFilterJson;



        //Default filters
        if(!gameName || type != 'avatar') return DNAFilter.itemFilterJson;
        else return DNAFilter.avatarFilterJson;
    }

    processProperties(gameName: string, properties: any[]) {
        // if (this.type == 'item' || 'gem') this.properties = [{ title: 'Type', id: 'classical_element', value: '--', tooltip: false }, { title: 'Damage', id: 'damage_nd', value: '--', tooltip: false }, { title: 'Range', id: 'range_nd', value: '--', tooltip: false }, { title: 'Power', id: 'power_nd', value: '--', tooltip: false }, { title: 'Magical Power', id: 'magical_exp', value: '--', tooltip: false }, { title: 'Weapon Material', id: 'weapon_material', value: '--', tooltip: false }, { title: 'Primary Color', id: 'primary_color', value: '--', tooltip: false, showColor: true },]
        // if (this.type == 'avatar' && gameName == 'Dreadstone Keep') this.properties = [{ title: 'Sex', id: 'sex_bio', value: '--', tooltip: false }, { title: 'Body Strength', id: 'body_strength', value: '--', tooltip: false }, { title: 'Body Type', id: 'body_type', value: '--', tooltip: false }, { title: 'Skin Color', id: 'human_skin_color', value: '--', tooltip: false, showColor: true }, { title: 'Hair Color', id: 'human_hair_color', value: '--', tooltip: false, showColor: true }, { title: 'Eye Color', id: 'human_eye_color', value: '--', tooltip: false, showColor: true }, { title: 'Hair Style', id: 'hair_styles', value: '--', tooltip: false }, { title: 'Weapon Type', id: 'weapon_type', value: '--', tooltip: false }, { title: 'Weapon Material', id: 'weapon_material', value: '--', tooltip: false }, { title: 'Primary Color', id: 'primary_color', value: '--', tooltip: false, showColor: true },]
        // if (this.type == 'avatar' && gameName != 'Dreadstone Keep') this.properties = [{ title: 'Sex', id: 'sex_bio', value: '--', tooltip: false }, { title: 'Body Strength', id: 'body_strength', value: '--', tooltip: false }, { title: 'Body Type', id: 'body_type', value: '--', tooltip: false }, { title: 'Skin Color', id: 'human_skin_color', value: '--', tooltip: false, showColor: true }, { title: 'Hair Color', id: 'human_hair_color', value: '--', tooltip: false, showColor: true }, { title: 'Eye Color', id: 'human_eye_color', value: '--', tooltip: false, showColor: true }, { title: 'Hair Style', id: 'hair_styles', value: '--', tooltip: false }, { title: 'Primary Color', id: 'primary_color', value: '--', tooltip: false, showColor: true },]
    }

}