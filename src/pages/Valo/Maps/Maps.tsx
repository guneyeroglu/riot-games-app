import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Maps = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoMaps');
  }, [t]);

  return <div>Maps</div>;
};

export default Maps;
