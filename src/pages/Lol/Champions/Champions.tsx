import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Champions = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageLolChampions');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return <div>champ Champ</div>;
};

export default Champions;
