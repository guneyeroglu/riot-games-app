import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Agents = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('pageValoAgents');
  }, [t]);

  return <div>Agents</div>;
};

export default Agents;
