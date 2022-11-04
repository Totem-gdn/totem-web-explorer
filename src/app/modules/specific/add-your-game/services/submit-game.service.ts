import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ImagesToUpload, ImagesUrls, JsonDNAFilters, SubmitGame } from "@app/core/models/interfaces/submit-game-interface.model";
import { BaseStorageService } from "@app/core/services/utils/base-storage.service";
import { environment } from "@env/environment";
import { BehaviorSubject, concat, Observable } from "rxjs";


@Injectable({ providedIn: 'root' })

export class SubmitGameService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;
  currentIdToUpload: string = '';

  constructor(private http: HttpClient,
              private storage: BaseStorageService) {
  }

  postGame(body: SubmitGame | null): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/games`, body);
  }

  getGame(id: string) {
    this.http.get<any>(`${this.baseUrl}/games/${id}`).subscribe((data: any) => {
      console.log(data, '6338aafe7edc08f592ea74e1');

    })
  }
  approveGame(id: string) {
    this.http.patch<any>(`${this.baseUrl}/games/${id}/approve`, {}).subscribe((data: any) => {
      console.log(data);

    })
  }
  deleteGame(id: string) {
    this.http.delete<any>(`${this.baseUrl}/games/${id}`).subscribe((data: any) => {
      console.log(data);

    })
  }

  componeFilesToUpload(images: ImagesToUpload, links: ImagesUrls, connections?: { dnaFilter?: string }, jsonFiles?: JsonDNAFilters | null): Observable<any>[] {
    let imagesWithUrls: {url: string | undefined, file: File | undefined}[] = [];
    imagesWithUrls.push({url: links?.coverImage, file: images?.coverImage});
    imagesWithUrls.push({url: links?.cardThumbnail, file: images?.cardImage});
    imagesWithUrls.push({url: links?.smallThumbnail, file: images?.searchImage});
    links.imagesGallery?.forEach((link: string, i: number) => {
      imagesWithUrls.push({url: link, file: images.gallery![i]});
    })
    if (jsonFiles?.gameDNA) {
      imagesWithUrls.push({url: connections?.dnaFilter, file: jsonFiles.gameDNA ? jsonFiles.gameDNA : undefined})
    }
    if (jsonFiles?.itemDNA) {
      imagesWithUrls.push({url: connections?.dnaFilter, file: jsonFiles.itemDNA ? jsonFiles.itemDNA : undefined})
    }
    if (jsonFiles?.avatarDNA) {
      imagesWithUrls.push({url: connections?.dnaFilter, file: jsonFiles.avatarDNA ? jsonFiles.avatarDNA : undefined})
    } // NEED TO IMPROVE WITH BE
    console.log(imagesWithUrls);
    return this.connectImagesWithUrls(imagesWithUrls);
  }

  connectImagesWithUrls(imgUrlPair: {url: string | undefined, file: File | undefined}[]): Observable<any>[] {
    const imgUrlRequests: Observable<any>[] = imgUrlPair.map(pair => this.uploadImage(pair.url, pair.file));
    return imgUrlRequests;
  }

  uploadImage(url: string | undefined, file: File | undefined): Observable<any> {
    return this.http.put<any>(`${url}`, file, { reportProgress: true, observe: 'events' });
  }

}
