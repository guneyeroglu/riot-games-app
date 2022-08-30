import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Maps = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoMaps');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return <div>Maps</div>;
};

export default Maps;
