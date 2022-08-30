import image1 from '../../../../assets/images/lol/tf-graves-pride-banner.jpeg';
import image2 from '../../../../assets/images/lol/belveth-splash.jpeg';
import image3 from '../../../../assets/images/lol/eyes-and-embers-splash.jpeg';
import image4 from '../../../../assets/images/lol/stranger-in-the-road-splash.jpeg';
import image5 from '../../../../assets/images/lol/renata-splash.jpeg';

export interface IImage {
  id: number;
  name: string;
  url: string;
}

const imagesCarousel: IImage[] = [
  { id: 1, name: 'TF and Graves', url: image1 },
  { id: 2, name: 'Belveth', url: image2 },
  { id: 3, name: 'Eyes and Embers', url: image3 },
  { id: 4, name: 'Stranger in the Road', url: image4 },
  { id: 5, name: 'Renata', url: image5 },
];

export default imagesCarousel;
