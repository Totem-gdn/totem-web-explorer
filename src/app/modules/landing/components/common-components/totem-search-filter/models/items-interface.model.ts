export interface Items {
  img: string;
  name: string;
  type: string;
}

export interface Game {
  general: {
    name: string;
    genre: string[];
  }
  images: {
    coverImage: string;
    cardThumbnail: string;
    smallThumbnail: string;
    gallery: string[];
  }
}
