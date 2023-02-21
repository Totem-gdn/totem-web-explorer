import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RendererAvailableTypes } from "@app/core/models/interfaces/asset-info.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class TotemLegacyCardService {

  constructor(
    private http: HttpClient
  ) {}

  checkAssetRendererInfo(url: string): Observable<RendererAvailableTypes> {
    return this.http.get<RendererAvailableTypes>(`${url}/info`);
  }

}
