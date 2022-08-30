import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Items = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageLolItems');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return <div>Items</div>;
};

export default Items;
