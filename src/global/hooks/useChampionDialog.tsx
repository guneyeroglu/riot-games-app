import { useState } from 'react';
import { DialogLolChampion } from '../../components/Dialogs';

const useChampionDialog = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [championName, setChampionName] = useState<string>('');

  return {
    DialogLolChampion,
    openModal,
    setOpenModal,
    championName,
    setChampionName,
  };
};

export default useChampionDialog;
