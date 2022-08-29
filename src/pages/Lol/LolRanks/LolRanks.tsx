import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LolRanks = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pageLolRanks');
  }, [t]);

  return <div>LolRanks</div>;
};

export default LolRanks;
