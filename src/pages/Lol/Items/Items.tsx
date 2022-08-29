import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Items = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pageLolItems');
  }, [t]);

  return <div>Items</div>;
};

export default Items;
