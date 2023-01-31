import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'youtubeThumbnail'
})

export class YoutubeThumbnail implements PipeTransform {
    transform(url: any, args?: any) {
        
        const id = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.pop();
        
        if(!url) return '';
        const img = 'https://img.youtube.com/vi/' + id + '/0.jpg';
        return img;

        // return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${youtubeId}`);
      }
}