import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ValoRanks = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoRanks');
  }, [t]);

  return <div>ValoRanks</div>;
};

export default ValoRanks;
