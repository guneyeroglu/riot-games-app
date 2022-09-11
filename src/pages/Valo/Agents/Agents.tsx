import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { CardValoAgent } from '../../../components/Cards';

import Filter from '../../../components/Filter/Filter';
import SearchBar from '../../../components/Search/SearchBar';
import Spinner from '../../../components/Spinner/Spinner';
import useFetchData from '../../../global/hooks/useFetchData';

import styles from './agent.module.scss';

interface IAgent {
  uuid: string;
  displayName: string;
  description: string;
  fullPortrait: string;
  background: string;
  role: {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
  };
  abilities: {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
  };
}

const Agents = () => {
  const { t, i18n } = useTranslation();

  const [inputValue, setInputValue] = useState<string>('');

  const { data, isLoading, refetch } = useFetchData('valo-agents');

  useEffect(() => {
    document.title = t('pageValoAgents');
    document.documentElement.lang = i18n.language.slice(0, 2);

    refetch();
  }, [t, i18n, refetch]);

  return (
    <div className={styles.container}>
      <div className={styles.container__filter}>
        <Filter data={data} inputValue={inputValue} />
        <SearchBar
          find='agent'
          inputValue={inputValue}
          onSetInputValue={setInputValue}
        />
      </div>
      <div className={styles.container__cards}>
        {isLoading && <Spinner />}
        {!isLoading &&
          data.data
            .filter(
              (agent: { isPlayableCharacter: boolean }) =>
                agent.isPlayableCharacter
            )
            .filter((agent: IAgent) =>
              agent.displayName.toUpperCase().includes(inputValue.toUpperCase())
            )
            .map((agent: IAgent) => (
              <CardValoAgent data={agent} key={agent.uuid} />
            ))}
      </div>
    </div>
  );
};

export default Agents;
