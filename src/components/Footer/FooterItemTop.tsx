import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './footer.module.scss';

interface IProps {
  pathname: string;
}

const FooterItemTop = ({ pathname }: IProps) => {
  const { t } = useTranslation();
  const [href, setHref] = useState<string>('');

  useEffect(() => {
    if (pathname.includes('valorant')) {
      setHref(t('valoGameDownload'));
    } else {
      setHref(t('lolGameDownload'));
    }
  }, [pathname, href, t]);

  return (
    <div className={styles.wrapper__links}>
      <a href={href} target={'_blank'} rel='noreferrer'>
        <span>{t('downloadGameText')}</span>
      </a>
      <a href={t('riotAppDownload')} target={'_blank'} rel='noreferrer'>
        <span>{t('downloadAppText')}</span>
      </a>
    </div>
  );
};

export default FooterItemTop;
