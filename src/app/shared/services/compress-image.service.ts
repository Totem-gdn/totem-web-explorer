import { Injectable } from '@angular/core';
import { NgxImageCompressService, DataUrl } from "ngx-image-compress";

@Injectable({
  providedIn: 'root'
})
export class CompressImageService {
  constructor(
    private imageCompress: NgxImageCompressService
  ) { }

  async compressImage(image: File): Promise<File> {
    return new Promise((resolve) => {
      const imageReader: FileReader = new FileReader();
      let imageUrl: string = '';
      imageReader.readAsDataURL(image);
      imageReader.onload = async (event: any) => {
        imageUrl = event.target.result
        const res = await this.imageCompress.compressFile(imageUrl, -1, 100, 86);
        const resFile: File = this.base64ToFile(res, image.name);
        resolve(resFile);
      };
    })
  }

  base64ToFile(data: any, filename: string): File {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}
