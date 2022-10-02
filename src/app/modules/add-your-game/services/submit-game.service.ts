import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ImagesToUpload, ImagesUrls, SubmitGame } from "@app/core/models/submit-game-interface.model";
import { BaseStorageService } from "@app/core/services/base-storage.service";
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
    this.approveGame(this.currentIdToUpload);
    /* const imgUrlRequests = imgUrlPair.map(pair => {
      let fileName = pair.file!.name;
      const formData = new FormData();
      formData.append("card", pair.file!);
      return this.uploadImage(pair.url, formData);
    }); */
  }

  uploadImage(url: string | undefined, file: File | undefined): Observable<any> {
    return this.http.put<any>(`${url}`, file, { reportProgress: true, observe: 'events' });
  }

  saveForm(formName: string, value: any) {
    if (formName == 'general') this.storage.setItem('general', JSON.stringify(value));
    if (formName == 'details') this.storage.setItem('details', JSON.stringify(value));
    if (formName == 'contacts') this.storage.setItem('contacts', JSON.stringify(value));
    if (formName == 'connections') this.storage.setItem('connections', JSON.stringify(value));

  }

  getForm(formName: string) {
    const values = this.storage.getItem(formName);
    if (!values) return null;
    return JSON.parse(values);
  }

}
