export interface HomepageBlock {
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
}
