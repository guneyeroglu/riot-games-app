import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Regions = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pageLolRegions');
  }, [t]);

  return <div>Regions</div>;
};

export default Regions;
