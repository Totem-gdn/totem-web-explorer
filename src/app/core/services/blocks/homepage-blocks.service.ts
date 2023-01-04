import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HomepageBlock } from "@app/core/models/interfaces/homepage-blocks.interface";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class HomepageBlocksService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;

  constructor(
    private http: HttpClient,
    ) {}

  getBlocks(): Observable<HomepageBlock[]> {
    return this.http.get<HomepageBlock[]>(`${this.baseUrl}/blocks?page=1`);
  }

}
