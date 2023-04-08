interface IImage {
  full: string;
  group: string;
  h: number;
  sprite: string;
  w: number;
  x: number;
  y: number;
}

interface ISkill {
  description: string;
  image: IImage;
  name: string;
}

interface ISkin {
  id: string;
  name: string;
  num: number;
}

export interface IChampionDetails {
  blurb: string;
  id: string;
  image: IImage;
  key: string;
  lore: string;
  name: string;
  passive: ISkill;
  skins: ISkin[];
  spells: ISkill[];
  title: string;
  tags: string[];
}
