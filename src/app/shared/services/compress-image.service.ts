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
      let imageUrl: string = ''
      imageReader.readAsDataURL(image);
      imageReader.onload = async (event: any) => {
        imageUrl = event.target.result
        const res = await this.imageCompress.compressFile(imageUrl, null!, 50, 50);
        resolve(new File([res], image.name, { type: image.type }))
      };
    })
  }
}
