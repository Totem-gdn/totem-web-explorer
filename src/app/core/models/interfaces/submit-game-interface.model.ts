
export interface FormValidity {
  basicInfoValid?: boolean;
  detailsValid?: boolean;
  connectionsValid?: boolean;
}
export interface SubmitGame {
  [index: string]: any;
  general?: GeneralInfo;
  details?: DetailsInfo;
  images?: ImagesInfo;
  connections?: ConnectionsInfo;
  contacts?: ContactsInfo;
}

export interface SocialLinksInfo {
  type?: string;
  url?: string;
}

export interface ContactsInfo {
  email?: string;
  discord?: string;
}

export interface ImageFileInfo {
  filename?: string;
  mimeType?: string;
  contentLength?: number;
}

export interface ImagesInfo {
  coverImage?: ImageFileInfo;
  cardThumbnail?: ImageFileInfo;
  smallThumbnail?: ImageFileInfo;
  gallery?: ImageFileInfo[];
}

export interface GeneralInfo {
  name?: string;
  author?: string;
  description?: string;
  fullDescription?: string;
  genre?: string[];
}

export interface ConnectionsInfo {
  webpage?: string;
  assetRenderer?: string;
  promoVideo?: string;
  dnaFilter?: ImageFileInfo;
  socialLinks?: SocialLinksInfo[];
}

export interface DetailsInfo {
  status?: string;
  platforms?: string[];
  madeWith?: string;
  session?: string;
  languages?: string;
  inputs?: string;
}

///

export interface ImagesToUpload {
  coverImage?:  File | undefined;
  cardImage?: File | undefined;
  searchImage?: File | undefined;
  gallery?: File[] | undefined;
}

export interface ImagesUrls {
  coverImage?: string;
  cardThumbnail?: string;
  smallThumbnail?: string;
  imagesGallery?: string[];
}

export interface SubmitGameResponse {
  id: string;
  connections: {
    dnaFilter?: string;
  };
  uploadImageURLs: ImagesUrls;
}

export interface ImageEvents {
  coverEvent?: any | null;
  cardEvent?: any | null;
  searchEvent?: any | null;
}


export interface GameDetail {
  [index: string]: any;
  general?: GeneralInfo;
  details?: DetailsInfo;
  images?: ImagesUrls; // <---
  connections?: ConnectionsInfo;
  contacts?: ContactsInfo;
  assets?: {items: number; avatars: number};
  createdAt?: string;
  id?: string;
  isLiked?: boolean;
  likes?: number;
  owner?: string;
  players?: number;
  updatedAt?: string;
  views?: number;
}
