import { Injectable } from "@angular/core";
const convert = require('color-convert');

@Injectable({ providedIn: 'root' })

export class DNAParserService {

    handleDNAField(id: string, value: string) {

        if(id == 'primary_color') {
            console.log('primary', value)
            return this.rgba2hex(value);
        }
        if(id == 'sex_bio') {
            if(value == '0') return 'Male';
            if(value == '1') return 'Female';
        }
        if(id == 'body_strength') {
            if(value == '0') return 'Muscular';
            if(value == '1') return 'Wimp';
        }
        if(id == 'body_type') {
            if(value == '0') return 'Fat';
            if(value == '1') return 'Thin';
        }

        return value;
    }

    rgba2hex(rgba: any) {
        const rgb = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
         ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
         ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
         ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
      }
}