import image1 from '../../../../assets/images/lol/nilah-splash.jpeg';
import image2 from '../../../../assets/images/lol/noxus-perpetual-conflict.jpeg';
import image3 from '../../../../assets/images/lol/belveth-splash.jpeg';
import image4 from '../../../../assets/images/lol/ahri-polycount.jpeg';
import image5 from '../../../../assets/images/lol/arcade-splash.jpeg';
import image6 from '../../../../assets/images/lol/star-crossed.jpeg';
import image7 from '../../../../assets/images/lol/tf-graves-pride-banner.jpeg';
import image8 from '../../../../assets/images/lol/zaun-backstreetdeals.jpeg';
import image9 from '../../../../assets/images/lol/renata-splash.jpeg';
import image10 from '../../../../assets/images/lol/eyes-and-embers-splash.jpeg';

export interface IImage {
  id: number;
  name: string;
  url: string;
}

const imagesCarousel: IImage[] = [
  { id: 1, name: 'Nilah', url: image1 },
  { id: 2, name: 'Noxus', url: image2 },
  { id: 3, name: 'Belveth', url: image3 },
  { id: 4, name: 'Ahri', url: image4 },
  { id: 5, name: 'Arcade', url: image5 },
  { id: 6, name: 'Star Crossed', url: image6 },
  { id: 7, name: 'TF and Graves', url: image7 },
  { id: 8, name: 'Zaun', url: image8 },
  { id: 9, name: 'Renata', url: image9 },
  { id: 10, name: 'Eyes and Embers', url: image10 },
];

export default imagesCarousel;
