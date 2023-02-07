
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
  connections?: SubmitGameConnectionsInfo;
  contacts?: ContactsInfo;
  galleryImagesForDelete?: string[];
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

export interface SubmitGameConnectionsInfo {
  webpage?: string;
  assetRenderer?: string;
  promoVideo?: string;
  dnaFilters?: JsonDNAFiltersToUpload;
  socialLinks?: SocialLinksInfo[];
}

export interface ConnectionsInfo {
  webpage?: string;
  assetRenderer?: string;
  promoVideo?: string;
  dnaFilters?: JsonDnaFilesUrls;
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

export interface existingImagesUrls {
  coverImage?: string;
  cardThumbnail?: string;
  smallThumbnail?: string;
  gallery?: string[];
}

export interface SubmitGameResponse {
  id: string;
  connections: {
    dnaFilters?: JsonDnaFilesUrls;
  };
  uploadImageURLs: ImagesUrls;
}

export interface ImageEvents {
  coverEvent?: any | null;
  cardEvent?: any | null;
  searchEvent?: any | null;
}

export interface GameSlide {
  type?: 'image' | 'video';
  url?: string;
}
export interface GameDetail extends CustomCheckboxField {
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

export interface CustomCheckboxField {
  checked?: boolean;
}

export interface JsonDNAFilters {
  avatarFilter?: File | null;
  assetFilter?: File | null;
  gemFilter?: File | null;
}
export interface JsonDNAFiltersToDelete {
  avatarFilter?: boolean;
  assetFilter?: boolean;
  gemFilter?: boolean;
}

export interface JsonDNAFiltersToUpload {
  avatarFilter?: ImageFileInfo;
  assetFilter?: ImageFileInfo;
  gemFilter?: ImageFileInfo;
}

export interface JsonDnaFilesUrls {
  avatarFilter?: string;
  assetFilter?: string;
  gemFilter?: string;
}
