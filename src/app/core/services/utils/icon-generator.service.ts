import { createAvatar } from '@dicebear/core';
import { shapes } from '@dicebear/collection';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomIconGeneratorService {

  getUserIcon(seed: string): string {
    const avatar = createAvatar(shapes, {
      seed: seed || '',
      size: 64,
      shape1: ["polygon","polygonFilled","line"]
    });
    const svg = avatar.toDataUriSync();
    return svg;
  }

}

