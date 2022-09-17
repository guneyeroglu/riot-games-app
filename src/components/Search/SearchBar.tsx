import { Dispatch } from 'react';

import { useTranslation } from 'react-i18next';

import { Icon } from '../Icons/Icon';

import styles from './search.module.scss';

type find = 'champion' | 'agent';

interface IProps {
  inputValue: string;
  onSetInputValue: Dispatch<string>;
  find: find;
}

const SearchBar = (props: IProps) => {
  const { t } = useTranslation();

  const { inputValue, onSetInputValue, find } = props;

  const placeholder: string =
    find === 'champion' ? t('searchChampion') : t('searchAgent');

  const logo: JSX.Element =
    find === 'champion' ? (
      <img
        src={
          'https://universe.leagueoflegends.com/esimages/content_type_icon_champion__3nwJQ.png'
        }
        alt='search-icon'
      />
    ) : (
      <Icon name='ValorantIcon' />
    );

  const handleInputChange = (event: { target: HTMLInputElement }) => {
    onSetInputValue(event.target.value.toLocaleLowerCase().toUpperCase());
  };

  const handleInputValue = () => {
    onSetInputValue('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__filter}>
        <input
          type={'search'}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className={styles['wrapper__filter--logo']}>{logo}</div>
        {inputValue.length > 0 && (
          <button
            className={styles['wrapper__filter--close']}
            onClick={handleInputValue}
          >
            <Icon name='CloseIcon' />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
