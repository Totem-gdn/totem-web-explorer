import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ImagesToUpload, ImagesUrls, SubmitGame } from "@app/core/models/submit-game-interface.model";
import { BaseStorageService } from "@app/core/services/base-storage.service";
import { environment } from "@env/environment";
import { BehaviorSubject, concat, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class SubmitGameService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;

  constructor(private http: HttpClient,
              private storage: BaseStorageService) {
  }

  postGame(body: SubmitGame | null): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/games`, body);
  }

  getGame() {
    this.http.get<any>(`${this.baseUrl}/games/6336d28dac1ce79bc5b7604f`).subscribe((data: any) => {
      console.log(data);

    })
  }
  approveGame() {
    this.http.patch<any>(`${this.baseUrl}/games/6336d28dac1ce79bc5b7604f/approve`, {}).subscribe((data: any) => {
      console.log(data);

    })
  }

  componeFilesToUpload(images: ImagesToUpload, links: ImagesUrls) {
    let imagesWithUrls: {url: string | undefined, file: File | undefined}[] = [];
    imagesWithUrls.push({url: links?.coverImage, file: images?.coverImage});
    imagesWithUrls.push({url: links?.cardThumbnail, file: images?.cardImage});
    imagesWithUrls.push({url: links?.smallThumbnail, file: images?.searchImgae});
    links.imagesGallery?.forEach((link: string, i: number) => {
      imagesWithUrls.push({url: link, file: images.gallery![i]});
    })
    console.log(imagesWithUrls);
    this.connectImagesWithUrls(imagesWithUrls);
  }

  connectImagesWithUrls(imgUrlPair: {url: string | undefined, file: File | undefined}[]) {
    const imgUrlRequests = imgUrlPair.map(pair => this.uploadImage(pair.url, pair.file));
    concat(...imgUrlRequests).subscribe((event) => {
      if (event.type == HttpEventType.UploadProgress) {
        console.log(Math.round(100 * (event.loaded / event.total)));
      }
      console.log(event);
    });
  }

  uploadImage(url: string | undefined, file: File | undefined): Observable<any> {
    return this.http.put<any>(`${url}`, file, { reportProgress: true, observe: 'events' });
  }

  saveForm(formName: string, value: any) {
    if (formName == 'general') this.storage.setItem('general', JSON.stringify(value));
    if (formName == 'details') this.storage.setItem('details', JSON.stringify(value));
    if (formName == 'contacts') this.storage.setItem('contacts', JSON.stringify(value));
    if (formName == 'links') this.storage.setItem('links', JSON.stringify(value));

  }

  getForm(formName: string) {
    const values = this.storage.getItem(formName);
    if (!values) return null;
    return JSON.parse(values);
  }

}
