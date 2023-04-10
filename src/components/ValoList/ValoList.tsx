import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import agents from '../../assets/images/valo/agents.jpg';
import maps from '../../assets/images/valo/maps.jpg';
import arsenal from '../../assets/images/valo/arsenal.jpg';

import styles from './valo-list.module.scss';

type contentNames = 'agents' | 'maps' | 'arsenal' | 'ranks';

interface IContentList {
  id: number;
  name: contentNames;
  image: string;
}

const ValoList = () => {
  const { t, i18n } = useTranslation();

  const contentList: IContentList[] = [
    { id: 1, name: 'agents', image: agents },
    { id: 2, name: 'maps', image: maps },
    { id: 3, name: 'arsenal', image: arsenal },
  ];
  return (
    <ul className={styles.wrapper}>
      {contentList.map((li: IContentList) => (
        <li key={li.id} className={styles.wrapper__item}>
          <div className={styles['wrapper__item--content']}>
            <Link to={li.name}>
              <img src={li.image} alt={li.name} />
            </Link>
            <span>{i18n.language === 'tr_TR' ? t(li.name).toLocaleUpperCase('TR') : t(li.name).toLocaleUpperCase('en-US')}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ValoList;
