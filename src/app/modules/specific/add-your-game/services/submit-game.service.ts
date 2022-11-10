import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ImagesToUpload, ImagesUrls, JsonDnaFilesUrls, JsonDNAFilters, SubmitGame } from "@app/core/models/interfaces/submit-game-interface.model";
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

  updateGame(body: SubmitGame | null, id: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/games/${id}`, body);
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

  componeFilesToUpload(images: ImagesToUpload, links: ImagesUrls, connections?: { dnaFilters?: JsonDnaFilesUrls }, jsonFiles?: JsonDNAFilters): Observable<any>[] {
    let imagesWithUrls: {url: string | undefined, file: File | undefined}[] = [];
    imagesWithUrls.push({url: links?.coverImage, file: images?.coverImage});
    imagesWithUrls.push({url: links?.cardThumbnail, file: images?.cardImage});
    imagesWithUrls.push({url: links?.smallThumbnail, file: images?.searchImage});
    links.imagesGallery?.forEach((link: string, i: number) => {
      imagesWithUrls.push({url: link, file: images.gallery![i]});
    })
    if (jsonFiles?.avatarFilter) {
      imagesWithUrls.push({url: connections?.dnaFilters?.avatarFilter, file: jsonFiles?.avatarFilter ? jsonFiles?.avatarFilter : undefined})
    }
    if (jsonFiles?.assetFilter) {
      imagesWithUrls.push({url: connections?.dnaFilters?.assetFilter, file: jsonFiles?.assetFilter ? jsonFiles?.assetFilter : undefined})
    }
    if (jsonFiles?.gemFilter) {
      imagesWithUrls.push({url: connections?.dnaFilters?.gemFilter, file: jsonFiles?.gemFilter ? jsonFiles?.gemFilter : undefined})
    }
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
