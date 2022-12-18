import image1 from '../../../../assets/images/lol/items.jpeg';
import image2 from '../../../../assets/images/lol/ranks.jpeg';

import { typesLol } from '../../../../global/types/';

interface IImage {
  id: number;
  name: typesLol;
  view: string;
  url: string;
}

const imagesOther: IImage[] = [
  { id: 1, name: 'items', view: 'viewItems', url: image1 },
  { id: 2, name: 'ranksLol', view: 'viewRanks', url: image2 },
];

export default imagesOther;
