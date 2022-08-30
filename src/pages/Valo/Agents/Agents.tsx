import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Agents = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoAgents');
    document.documentElement.lang = i18n.language.slice(0, 2);
  }, [t, i18n]);

  return <div>Agents</div>;
};

export default Agents;
