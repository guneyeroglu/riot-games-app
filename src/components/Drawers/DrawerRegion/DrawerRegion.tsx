import { useState } from 'react';

import { SwipeableDrawer } from '@mui/material';

import styles from './drawer-region.module.scss';

const DrawerRegion = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
    >
      <div className=''>
        <div></div>
      </div>
    </SwipeableDrawer>
  );
};

export default DrawerRegion;
