import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RendererAvailableTypes } from "@app/core/models/interfaces/asset-info.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class AssetLegacyItemService {

  constructor(
    private http: HttpClient
  ) {}

  checkAssetRendererInfo(url: string): Observable<RendererAvailableTypes> {
    return this.http.get<RendererAvailableTypes>(`${url}/info`);
  }

  decodeData(data?: string, isJson: boolean = false): { data: string, description: string } {
    if (!data) {
      return { data: '', description: '' };
    }
    let decodedData: string = this.tryToDecodeData(data);
    if (!decodedData) return { data: '', description: '' };

    if (/^[\],:{}\s]*$/.test(decodedData.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      //the json is ok
      const parsedJson: {description: string} = JSON.parse(decodedData);
      //let decodedJson: { data: string, description: string } = {data: '', description: parsedJson?.description}; //description will be field, no need to decode
      let decodedJson: { data: string, description: string } = this.decodeData(parsedJson?.description, true);
      if (!decodedJson.description) return { data: decodedJson.data, description: '' };
      return { data: decodedJson.data, description: decodedJson.description };
    } else {
      //the json is not ok
      return { data: decodedData, description: isJson ? decodedData : '' };
    }
  }

  tryToDecodeData(strToDec: string): string {
    if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(strToDec)) {
      let decodedData: string = window.atob(strToDec);
      return decodedData;
    }
    return strToDec;
  }

}
