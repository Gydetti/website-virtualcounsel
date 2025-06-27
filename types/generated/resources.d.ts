export interface Resources {
  slug: string;
  resourceType: string;
  title: string;
  subtitle: string;
  heroImage: Image;
  sections: Section[];
}

export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Section {
  type: Type;
  content?: string;
  image?: Image;
  caption?: string;
  title?: string;
  description?: string;
  config?: Config;
}

export interface Config {
  provider: string;
  embedCode: string;
}

export enum Type {
  Form = 'form',
  Image = 'image',
  Text = 'text',
}
