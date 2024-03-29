import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RendererAvailableTypes } from "@app/core/models/interfaces/asset-info.model";
import { Observable } from "rxjs";
import { DecodedLegacy, JsonDecodeStep } from "../models/legacy-processing.interface";

@Injectable({providedIn: 'root'})

export class AssetLegacyItemService {

  constructor(
    private http: HttpClient
  ) {}

  checkAssetRendererInfo(url: string): Observable<RendererAvailableTypes> {
    return this.http.get<RendererAvailableTypes>(`${url}/info`);
  }

  /* decodeData(data?: string, isJson: boolean = false): { data: string, description: string } {
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
  } */

  decodeData(data?: string | any): DecodedLegacy {
    if (!data) {
      return { data: '', description: '' };
    }
    if (typeof data === 'object') {
      const stringifiedData: any = JSON.stringify(data, undefined, 2);
      return { data: stringifiedData, description: ''};
    }
    let decodedData: string = this.tryToDecodeData(data);
    if (!decodedData) return { data: '', description: '' };

    let dataToReturn: DecodedLegacy = {data: '', description: ''}; // Declaring object to return

    const firstCheckResponse: JsonDecodeStep = this.decodePossibleJson(decodedData);

    dataToReturn = this.processDataCheck(firstCheckResponse);

    return dataToReturn;
  }

  processDataCheck(checkedData: JsonDecodeStep): DecodedLegacy {
    let dataToReturn: DecodedLegacy = {data: '', description: ''};

    if (checkedData.data) {
      dataToReturn.data = checkedData.data;
    }

    if (checkedData.isJson) {
      if (!checkedData?.description) return dataToReturn;

      let decodedData: string = this.tryToDecodeData(checkedData.description);
//
      const secondCheckResponse: JsonDecodeStep = this.decodePossibleJson(decodedData);
      if (secondCheckResponse.isJson) {
        dataToReturn.data = secondCheckResponse.data;
        dataToReturn.description = secondCheckResponse.description;
      } else {
        dataToReturn.description = secondCheckResponse.data
      }
//
      return dataToReturn;
    }

    return dataToReturn;
  }

  decodePossibleJson(data: string): JsonDecodeStep {
    if (/^[\],:{}\s]*$/.test(data.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

      //the json is ok
      const parsedJson: { description?: string } & any = JSON.parse(data);
      //console.log(parsedJson);
      const dataToReturn: string = JSON.stringify(parsedJson, undefined, 2);

      let description: string = parsedJson?.description;

      return { data: dataToReturn, isJson: true, description: description ? description : undefined };

    } else {
      //the json is not ok
      return { data: data, isJson: false };
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
