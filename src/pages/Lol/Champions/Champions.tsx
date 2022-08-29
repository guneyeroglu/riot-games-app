import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Champions = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pageLolChampions');
  }, [t]);

  return <div>champ Champ</div>;
};

export default Champions;
