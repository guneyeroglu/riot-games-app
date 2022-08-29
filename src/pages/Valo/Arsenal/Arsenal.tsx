import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Arsenal = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoArsenal');
  }, [t]);

  return <div>Arsenal</div>;
};

export default Arsenal;
