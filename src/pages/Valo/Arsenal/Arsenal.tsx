import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Arsenal = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoArsenal');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return <div>Arsenal</div>;
};

export default Arsenal;
