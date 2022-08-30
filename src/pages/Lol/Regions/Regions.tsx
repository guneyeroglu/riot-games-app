import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Regions = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageLolRegions');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return <div>Regions</div>;
};

export default Regions;
