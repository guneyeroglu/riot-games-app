import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { CardValoAgent } from '../../../components/Cards';

import Filter from '../../../components/Filter/Filter';
import SearchBar from '../../../components/Search/SearchBar';
import Spinner from '../../../components/Spinner/Spinner';
import FeaturedTitle from '../../../components/FeaturedTitle/FeaturedTitle';

import background from '../../../assets/images/valo/agent-background.jpeg';

import { useFetchData } from '../../../global/utils';

import styles from './agent.module.scss';

type abilityName = 'Ability1' | 'Ability2' | 'Grenade' | 'Ultimate' | 'Passive';
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
  abilities: [
    {
      slot: abilityName;
      displayName: string;
      description: string;
      displayIcon: string;
    }
  ];
  isPlayableCharacter: boolean;
}

const Agents = () => {
  const { t, i18n } = useTranslation();

  const [inputValue, setInputValue] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  const { data, isLoading, refetch } = useFetchData('valo-agents');

  useEffect(() => {
    document.title = t('pageValoAgents');
    document.documentElement.lang = i18n.language.slice(0, 2);

    refetch();
  }, [t, i18n, refetch]);

  const filteredData = data?.data
    .filter((agent: IAgent) => agent.isPlayableCharacter)
    .filter((agent: IAgent) =>
      agent.displayName.toUpperCase().includes(inputValue.toUpperCase())
    )
    .filter((agent: IAgent) => agent.role.displayName.includes(filterValue));

  return (
    <div className={styles.container}>
      <div
        className={styles.container__background}
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className={styles.container__filter}>
        <div className={styles['container__filter--mid']}>
          <SearchBar
            find='agent'
            inputValue={inputValue}
            onSetInputValue={setInputValue}
          />
          <Filter
            data={data}
            inputValue={inputValue}
            filterValue={filterValue}
            onSetFilterValue={setFilterValue}
          />
        </div>
      </div>
      <div className={styles.container__title}>
        <FeaturedTitle type='agents' />
      </div>
      <div className={styles.container__cards}>
        {isLoading && <Spinner padding={true} />}
        {!isLoading &&
          filteredData &&
          filteredData.map((agent: IAgent) => (
            <CardValoAgent data={agent} key={agent.uuid} />
          ))}
        {!isLoading && filteredData && filteredData.length === 0 && (
          <div className={styles['not-found']}>
            <span>{t('notFoundAgents')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;
