import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'creationTime'
})

export class TimeCreationPipe implements PipeTransform {
    transform(creationDate: any) : string {
        let delta = Math.abs(new Date().getTime() - new Date(creationDate).getTime()) / 1000;
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        const seconds = Math.floor(delta % 60);
        if(days > 0) {
            return `${days} days ago`;
        }
        if(hours > 0) {
            return `${hours} hours ago`;
        }
        if(minutes > 0) {
            return `${minutes} minutes ago`;
        }

        return `${seconds} seconds ago`;
    }
}