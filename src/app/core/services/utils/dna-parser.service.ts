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


    getJSON(gameName: string | undefined, type: string) {
        if(gameName == 'Dreadstone Keep' && type == 'avatar') return DNAFilter.totemAvatarDreadstoneKeepFilterJson;
        if(gameName == 'Dreadstone Keep' && type != 'avatar') return DNAFilter.totemItemDreadstoneKeepFilterJson;

        if(gameName == 'Monk vs Robots' && type == 'avatar') return DNAFilter.monkVsRobotsAvatarFilterJson;
        if(gameName == 'Monk vs Robots' && type != 'avatar') return DNAFilter.monkVsRobotsItemFilterJson;


        // console.log(DNAFilter)
        //Default filters
        if(!gameName || type != 'avatar') return DNAFilter.itemFilterJson;
        else return DNAFilter.avatarFilterJson;
    }

    processProperties(gameName: string, properties: any[]) {
        // if (this.type == 'item' || 'gem') this.properties = [{ title: 'Type', id: 'classical_element', value: '--', tooltip: false }, { title: 'Damage', id: 'damage_nd', value: '--', tooltip: false }, { title: 'Range', id: 'range_nd', value: '--', tooltip: false }, { title: 'Power', id: 'power_nd', value: '--', tooltip: false }, { title: 'Magical Power', id: 'magical_exp', value: '--', tooltip: false }, { title: 'Weapon Material', id: 'weapon_material', value: '--', tooltip: false }, { title: 'Primary Color', id: 'primary_color', value: '--', tooltip: false, showColor: true },]
        // if (this.type == 'avatar' && gameName == 'Dreadstone Keep') this.properties = [{ title: 'Sex', id: 'sex_bio', value: '--', tooltip: false }, { title: 'Body Strength', id: 'body_strength', value: '--', tooltip: false }, { title: 'Body Type', id: 'body_type', value: '--', tooltip: false }, { title: 'Skin Color', id: 'human_skin_color', value: '--', tooltip: false, showColor: true }, { title: 'Hair Color', id: 'human_hair_color', value: '--', tooltip: false, showColor: true }, { title: 'Eye Color', id: 'human_eye_color', value: '--', tooltip: false, showColor: true }, { title: 'Hair Style', id: 'hair_styles', value: '--', tooltip: false }, { title: 'Weapon Type', id: 'weapon_type', value: '--', tooltip: false }, { title: 'Weapon Material', id: 'weapon_material', value: '--', tooltip: false }, { title: 'Primary Color', id: 'primary_color', value: '--', tooltip: false, showColor: true },]
        // if (this.type == 'avatar' && gameName != 'Dreadstone Keep') this.properties = [{ title: 'Sex', id: 'sex_bio', value: '--', tooltip: false }, { title: 'Body Strength', id: 'body_strength', value: '--', tooltip: false }, { title: 'Body Type', id: 'body_type', value: '--', tooltip: false }, { title: 'Skin Color', id: 'human_skin_color', value: '--', tooltip: false, showColor: true }, { title: 'Hair Color', id: 'human_hair_color', value: '--', tooltip: false, showColor: true }, { title: 'Eye Color', id: 'human_eye_color', value: '--', tooltip: false, showColor: true }, { title: 'Hair Style', id: 'hair_styles', value: '--', tooltip: false }, { title: 'Primary Color', id: 'primary_color', value: '--', tooltip: false, showColor: true },]
    }

    getJSON1() {
        return JSON.parse(`[
            {"description": "Body Strength", 
                "id": "body_strength", 
                "type": "int", 
                "gene": 0, 
                "start": 13, 
                "length": 1,
                "values": [
                    "Wimp",
                    "Muscular"
                ]
            },
            {"description": "Body Strength", 
                "id": "body_strength", 
                "type": "bool", 
                "gene": 0, 
                "start": 13, 
                "length": 1,
                "values": [
                    "Wimp",
                    "Muscular"
                ]
            },
            {"description": "Body Type", 
                "id": "body_type", 
                "type": "bool", 
                "gene": 0, 
                "start": 14, 
                "length": 1,
                "values": [
                    "Thin",
                    "Fat"
                ]
            },
            {"description": "Human Skin Color", "id": "human_skin_color", "type": "map", "gene": 1, "start": 0, "length": 4,
                "values": [
                    {
                        "value": 0,
                        "key": "#f9d4ab"
                    },
                    {
                        "value": 1,
                        "key": "#efd2c4"
                    },
                    {
                        "value": 2,
                        "key": "#e2c6c2"
                    },
                    {
                        "value": 3,
                        "key": "#e0d0bb"
                    },
                    {
                        "value": 4,
                        "key": "#ebb77d"
                    },
                    {
                        "value": 5,
                        "key": "#dca788"
                    },
                    {
                        "value": 6,
                        "key": "#cda093"
                    },
                    {
                        "value": 7,
                        "key": "#ccab80"
                    },
                    {
                        "value": 8,
                        "key": "#c58351"
                    },
                    {
                        "value": 9,
                        "key": "#b37652"
                    },
                    {
                        "value": 10,
                        "key": "#81574b"
                    },
                    {
                        "value": 11,
                        "key": "#8a6743"
                    },
                    {
                        "value": 12,
                        "key": "#7a3e10"
                    },
                    {
                        "value": 13,
                        "key": "#5c2a19"
                    },
                    {
                        "value": 14,
                        "key": "#472422"
                    },
                    {
                        "value": 15,
                        "key": "#362714"
                    }
                ]},
            {"description": "Human Hair Color", "id": "human_hair_color", "type": "map", "gene": 1, "start": 4, "length": 3, 
                "values": [
                    {
                        "value": 0,
                        "key": "#b1b1b1"
                    },
                    {
                        "value": 1,
                        "key": "#070504"
                    },
                    {
                        "value": 2,
                        "key": "#341c0d"
                    },
                    {
                        "value": 3,
                        "key": "#62422e"
                    },
                    {
                        "value": 4,
                        "key": "#914329"
                    },
                    {
                        "value": 5,
                        "key": "#cd622b"
                    },
                    {
                        "value": 6,
                        "key": "#ad7b41"
                    },
                    {
                        "value": 7,
                        "key": "#e4b877"
                    }
                ]
            },
            {"description": "Human Eye Color", "id": "human_eye_color", "type": "map", "gene": 1, "start": 7, "length": 3,
                "values": [
                    {
                        "value": 0,
                        "key": "#b5d6e0"
                    },
                    {
                        "value": 1,
                        "key": "#90b4ca"
                    },
                    {
                        "value": 2,
                        "key": "#a7ad7f"
                    },
                    {
                        "value": 3,
                        "key": "#7c8b4f"
                    },
                    {
                        "value": 4,
                        "key": "#c4a05f"
                    },
                    {
                        "value": 5,
                        "key": "#a97e33"
                    },
                    {
                        "value": 6,
                        "key": "#7a3411"
                    },
                    {
                        "value": 7,
                        "key": "#3d0d04"
                    }
                ]
            },
            {"description": "Hair Style", "id": "hair_styles", "type": "map", "gene": 1, "start": 10, "length": 3,
                "values": [
                    {
                        "value": 0,
                        "key": "Afro"
                    },
                    {
                        "value": 1,
                        "key": "Asymmetrical"
                    },
                    {
                        "value": 2,
                        "key": "Braids"
                    },
                    {
                        "value": 3,
                        "key": "Buzzcut"
                    },
                    {
                        "value": 4,
                        "key": "Dreadlocks"
                    },
                    {
                        "value": 5,
                        "key": "Long"
                    },
                    {
                        "value": 6,
                        "key": "Ponytail"
                    },
                    {
                        "value": 7,
                        "key": "Short"
                    }
                ]
            }
        ]`)
    }

}
