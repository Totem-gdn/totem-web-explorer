import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RendererAvailableTypes } from "@app/core/models/interfaces/asset-info.model";
import { Observable } from "rxjs";
import { DecodedLegacy, JsonDecodeStep } from "../models/legacy-processing.interface";

@Injectable({providedIn: 'root'})

export class GameLegacyItemService {

  constructor(
    private http: HttpClient
  ) {}

  checkAssetRendererInfo(url: string): Observable<RendererAvailableTypes> {
    return this.http.get<RendererAvailableTypes>(`${url}/info`);
  }


  // CASE DATA = 'Killed monster';
  // CASE DATA = 'SGSSDFHDFW262teWT2teWET2t=='  -->  'Killed monster';
  // CASE DATA = 'asAgdsg25DFHDFW262teWT3fgewh2='  -->  '{asdgln: asdfsdf, sadknsgd: sdfsa}' // JSON base64 NO DESCRIPTION;
  // CASE DATA = 'asAgdsg25DFHDFW262teWT3fgewh2='  -->  '{asdgln: asdfsdf, sadknsgd: sdfsa, description: Killed monster}' // DESCRIPTION string;
  // CASE DATA = 'asAgdsg25DFHDFW262teWT3fgewh2='  -->  '{description: asAgdsg25DFHDFW262teWT3fgewh2=}' // DESCRIPTION ENCODED BASE64 STRING;
  // CASE DATA = 'asAgdsg25DFHDFW262teWT3fgewh2='  -->  '{description: asAgdsg25DFHDFW262teWT3fgewh2={dasdg, sdgs}}' // DESCRIPTION ENCODED BASE64 JSON;

  decodeData(data?: string | any): DecodedLegacy {
    if (!data) {
      return { data: '', description: '', player: '' };
    }
    if (typeof data === 'object') {
      const stringifiedData: any = JSON.stringify(data, undefined, 2);
      return { data: stringifiedData, description: '', player: ''};
    }
    let decodedData: string = this.tryToDecodeData(data);
    if (!decodedData) return { data: '', description: '', player: '' };

    let dataToReturn: DecodedLegacy = {data: '', description: '', player: ''}; // Declaring object to return

    const firstCheckResponse: JsonDecodeStep = this.decodePossibleJson(decodedData);

    dataToReturn = this.processDataCheck(firstCheckResponse);

    return dataToReturn;
  }

  processDataCheck(checkedData: JsonDecodeStep): DecodedLegacy {
    console.log('checkd: ', checkedData);

    let dataToReturn: DecodedLegacy = {data: '', description: '', player: ''};

    if (checkedData.data) {
      dataToReturn.data = checkedData.data;
      dataToReturn.player = checkedData?.player;
    }

    if (checkedData.isJson) {
      if (!checkedData?.description) return dataToReturn;

      let decodedData: string = this.tryToDecodeData(checkedData.description);
//
      const secondCheckResponse: JsonDecodeStep = this.decodePossibleJson(decodedData);
      if (secondCheckResponse.isJson) {
        dataToReturn.data = secondCheckResponse.data;
        dataToReturn.description = secondCheckResponse.description;
        if (secondCheckResponse?.player) {
          dataToReturn.player = secondCheckResponse.player;
        }
      } else {
        dataToReturn.description = secondCheckResponse.data;
        if (secondCheckResponse?.player) {
          dataToReturn.player = secondCheckResponse.player;
        }
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
      let player: string = parsedJson?.player ? parsedJson.player : '-';
      //console.log({data: dataToReturn, isJson: true, description: description ? description : undefined, player: player});

      return { data: dataToReturn, isJson: true, description: description ? description : undefined, player: player };

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
