import { Dispatch } from 'react';

import { useTranslation } from 'react-i18next';

import { Icon } from '../Icons/Icon';

import styles from './search.module.scss';

type find = 'champion' | 'agent';

interface IProps {
  inputValue: string;
  onSetInputValue: Dispatch<any>;
  find: find;
}

const SearchBar = (props: IProps) => {
  const { t } = useTranslation();

  const { inputValue, onSetInputValue, find } = props;

  const placeholder: string =
    find === 'champion' ? t('searchChampion') : t('searchAgent');

  const url: string =
    find === 'champion'
      ? 'https://universe.leagueoflegends.com/esimages/content_type_icon_champion__3nwJQ.png'
      : '';

  const handleInputChange = (event: { target: HTMLInputElement }) => {
    onSetInputValue(event.target.value);
  };

  const handleInputValue = () => {
    onSetInputValue('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__filter}>
        <img src={url} alt='search-icon' />
        <input
          type={'search'}
          placeholder={placeholder}
          value={inputValue.toUpperCase()}
          onChange={handleInputChange}
        />
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
