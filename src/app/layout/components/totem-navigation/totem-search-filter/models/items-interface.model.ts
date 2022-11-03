export interface Items {
  tokenId?: string;
  gradient?: string;
  id?: string;
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
