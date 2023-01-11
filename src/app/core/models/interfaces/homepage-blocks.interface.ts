/* export interface HomepageBlock {
  title: string;
  type: string;
  id?: string;
  data: {
      title?: string;
      subtitle?: string;
      text?: string;
      button_text?: string;
      button_link?: string;
      imageUrl?: string;
  } & any;
} */
export interface HomepageBlock {
  title?: string;
  type?: string;
  id?: string;
  data?: {
      type?       : string;
      title?      : string;
      titleFont?  : string;
      titleSizes?: string[];
      description?: string;
      image?      : string;
      gameUrl?    : string;
      videoUrl?   : string;
      eventUrl?   : string;
  } & EventBlockContent;
}

export interface EventBlockContent {
  titleLines?: DateEventBlock[];
  titleFonts?: EventContentFonts[];
  eventDate?: DateEventBlock;
  eventFonts?: EventContentFonts;
}

export interface EventContentFonts {
  size?: string[];
  height?: string[];
}

export interface DateEventBlock {
  date?: string;
  time?: string;
  format?: string;
  text?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  color?: string;
  blured?: boolean;
  shadowed?: boolean;
}
