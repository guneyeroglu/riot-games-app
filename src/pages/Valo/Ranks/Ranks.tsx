import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Ranks = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoRanks');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return <div>ValoRanks</div>;
};

export default Ranks;
